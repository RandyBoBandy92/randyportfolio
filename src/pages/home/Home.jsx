import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import AppIcon from "../../components/appicon/AppIcon";
import appsData from "../../utilities/appsData";
import AppWindow from "../appWindow/AppWindow";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./_home.scss";
import SkipToContent from "../../components/skip/SkipToContent";
import { siteTitle } from "../../globals/globals";
import desktopBG from "/assets/monkeBg.webp";
import mobileBG from "/assets/monkeBgMobile.webp";

const Home = () => {
  // searchParams and activeApps work together to determine which apps are active
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeApps, setActiveApps] = useState([]);
  const [mobileView, setMobileView] = useState(
    window.matchMedia("(max-width: 600px)").matches
  );

  useEffect(() => {
    // for adding the right background image
    // depending on viewport size
    const handleViewportChange = (e) => {
      setMobileView(e.matches);
    };
    window
      .matchMedia("(max-width: 600px)")
      .addEventListener("change", handleViewportChange);
    return () => {
      window
        .matchMedia("(max-width: 600px)")
        .removeEventListener("change", handleViewportChange);
    };
  }, []);

  useEffect(() => {
    // Update the activeApps state with the components from the appsData
    // because of how i wrote my data structure... I think I have to do some funky operations
    // to end up with a single filtered array of components
    const projects = Object.values(appsData.projects);
    const navigation = Object.values(appsData.navigation);
    const vsCodeBrowser = Object.values(appsData.vsCode);
    const allApps = [...projects, ...navigation, ...vsCodeBrowser];
    // now I do a for loop over the searchParams to see which apps are active
    const appsToShow = [];
    for (let index = 0; index < searchParams.getAll("app").length; index++) {
      const appId = searchParams.getAll("app")[index];
      const matchingApp = allApps.find((appData) => appData.id === appId);
      if (matchingApp) {
        appsToShow.push(
          <AppWindow
            launchApp={launchApp}
            closeApp={closeApp}
            focusApp={focusApp}
            appData={matchingApp}
            key={appId}
          >
            {matchingApp.component}
          </AppWindow>
        );
      }
    }
    setActiveApps(appsToShow);
    // if there are no apps to show, change the site title to "Randy Gulak | Portfolio"
    if (appsToShow.length === 0) {
      document.title = siteTitle;
    }
  }, [searchParams]);

  const updateSearchParams = (appId) => {
    // Update the URL to reflect the appId
    const filteredSearchParams = searchParams
      .getAll("app")
      .filter((app) => app !== appId);
    // By filtering out the appId, we can ensure that the app is not launched twice
    // and ensures that the last searchParam in the URL field reflects the active app
    const newSearchParams = [...filteredSearchParams, appId];
    setSearchParams({ app: newSearchParams });
    // Upon this methods completion, the activeApps state will be updated
    // via the useEffect hook
  };

  const launchApp = (appData) => {
    // if the app is already active, focus it
    if (activeApps.find((app) => app.props.appData.id === appData.id)) {
      focusApp(appData);
    } else {
      // wrapping this in an else because focusApp
      // also calls updateSearchParams
      // and we don't want to call it twice
      updateSearchParams(appData.id);
    }
  };

  // need a delete component
  const closeApp = (appData) => {
    // Update the URL to filter out the appId
    const newSearchParams = searchParams
      .getAll("app")
      .filter((app) => app !== appData.id);
    setSearchParams({ app: newSearchParams });
  };

  const focusApp = (appData, e) => {
    // After much experimenting with refs, I found vanilla JS to be the
    // only implementation that worked based on my current code structure
    // Not the best solution, but it gets the job done
    const appElements = document.querySelectorAll(".app-window");
    // I use Array.prototype as this method has the greatest browser support
    Array.prototype.forEach.call(appElements, (appElement) => {
      if (appElement.id === appData.id) {
        appElement.style.zIndex = "10000";
        appElement.classList.add("active");
        // For accessibility, focus the post inside the window
        document
          .getElementById(appElement.id)
          .querySelector(".app-content")
          .focus();
      } else {
        appElement.style.zIndex = "9999";
        appElement.classList.remove("active");
      }
    });
    updateSearchParams(appData.id);
    // document.title = `Randy Gulak | Portfolio - ${appData.title}`;
    document.title = siteTitle + ` - ${appData.title}`;
  };

  const backgroundFile = mobileView ? mobileBG : desktopBG;

  return (
    <>
      <SkipToContent />
      <div
        id="app"
        style={{
          backgroundImage: `url(${backgroundFile})`,
        }}
      >
        <Header />
        <main>
          <section className="projects">
            {Object.values(appsData.projects).map((app, index) => (
              <AppIcon launchApp={launchApp} key={app.id} appData={app} />
            ))}
          </section>
          {activeApps}
        </main>
        <Footer launchApp={launchApp} />
      </div>
    </>
  );
};

export default Home;
