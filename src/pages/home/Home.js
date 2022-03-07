import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import AppIcon from "../../components/appicon/AppIcon";
import appsData from "../../utilities/appsData";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./_home.scss";

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeApps, setActiveApps] = useState([]);

  // need a add component
  const launchApp = (appData) => {
    // Update the URL to reflect the appId
    // only add the appId if it's not already in the URL
    const appIsNotActive =
      activeApps.every((app) => app !== appData.component) &&
      searchParams.getAll("app").every((app) => app !== appData.id);
    if (appIsNotActive) {
      const newSearchParams = [...searchParams.getAll("app"), appData.id];
      console.log(newSearchParams);
      setSearchParams({ app: newSearchParams });
      // Update the activeApps with the component from the appData
      setActiveApps([...activeApps, appData.component]);
    }
  };

  // need a delete component
  const closeApp = (appData) => {
    // Update the URL to filter out the appId
    const newSearchParams = searchParams
      .getAll("app")
      .filter((app) => app !== appData.id);
    setSearchParams({ app: newSearchParams });
    // Update the activeApps to remove the component from the appData
    setActiveApps(activeApps.filter((app) => app !== appData.component));
  };

  return (
    <div id="app">
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
