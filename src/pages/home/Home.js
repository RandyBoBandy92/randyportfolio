import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import AppIcon from "../../components/appicon/AppIcon";
import appsData from "../../utilities/appsData";
import AppWindow from "../appWindow/AppWindow";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./_home.scss";
import SkipToContent from "../../components/skip/SkipToContent";

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
  }, [searchParams]);

  const launchApp = (appData) => {
    // if the app is already active, focus it
    if (activeApps.find((app) => app.props.appData.id === appData.id)) {
      focusApp(appData.id);
    }

    // Update the URL to reflect the appId
    const filteredSearchParams = searchParams
      .getAll("app")
      .filter((app) => app !== appData.id);
    // By filtering out the appId, we can ensure that the app is not launched twice
    const newSearchParams = [...filteredSearchParams, appData.id];
    setSearchParams({ app: newSearchParams });
  };

  // need a delete component
  const closeApp = (appData) => {
    // Update the URL to filter out the appId
    const newSearchParams = searchParams
      .getAll("app")
      .filter((app) => app !== appData.id);
    setSearchParams({ app: newSearchParams });
  };

  const focusApp = (appId, e) => {
    // After much experimenting with refs, I found vanilla JS to be the
    // only implementation that worked based on my current code structure
    // Not the best solution, but it gets the job done
    const appElements = document.querySelectorAll(".app-window");
    // I use Array.prototype as this method has the greatest browser support
    Array.prototype.forEach.call(appElements, (appElement) => {
      if (appElement.id === appId) {
        appElement.style.zIndex = "10000";
        appElement.classList.add("active");
      } else {
        appElement.style.zIndex = "9999";
        appElement.classList.remove("active");
      }
    });
  };

  const backgroundFile = mobileView ? "monkeBgMobile.webp" : "monkeBg.webp";

  return (
    <>
    <SkipToContent/>
    <div
      id="app"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/assets/${backgroundFile})`,
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
