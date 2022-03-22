import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import AppIcon from "../../components/appicon/AppIcon";
import appsData from "../../utilities/appsData";
import AppWindow from "../appWindow/AppWindow";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./_home.scss";
import monkeBg from "../../assets/images/monkeBg.jpeg";

const Home = () => {
  // searchParams and activeApps work together to determine which apps are active
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeApps, setActiveApps] = useState([]);

  useEffect(() => {
    // Update the activeApps state with the components from the appsData
    // because of how i wrote my data structure... I think I have to do some funky operations
    // to end up with a single filtered array of components
    const projects = Object.values(appsData.projects);
    const navigation = Object.values(appsData.navigation);
    const allApps = [...projects, ...navigation];
    // now I do a for loop over the searchParams to see which apps are active
    const appsToShow = [];
    for (let index = 0; index < searchParams.getAll("app").length; index++) {
      const appId = searchParams.getAll("app")[index];
      const appData = allApps.find((appData) => appData.id === appId);
      if (appData) {
        appsToShow.push(
          <AppWindow
            closeApp={closeApp}
            focusApp={focusApp}
            appData={appData}
            key={appId}
          >
            {appData.component}
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
    console.log(e);
    // After much experimenting with refs, I found vanilla JS to be the
    // only implementation that worked based on my current code structure
    // Not the best solution, but it gets the job done
    const appElements = document.querySelectorAll(".app-window");
    // I use Array.prototype as this method has the greatest browser support
    Array.prototype.forEach.call(appElements, (appElement) => {
      if (appElement.id === appId) {
        appElement.style.zIndex = "10000";
      } else {
        appElement.style.zIndex = "9999";
      }
    });
  };

  return (
    <div id="app" style={{ backgroundImage: `url(${monkeBg})` }}>
      <Header />
      <main>
        <section className="projects">
          {Object.values(appsData.projects).map((app) => (
            <AppIcon launchApp={launchApp} key={app.id} appData={app} />
          ))}
        </section>
        {activeApps}
      </main>
      <Footer launchApp={launchApp} />
    </div>
  );
};

export default Home;
