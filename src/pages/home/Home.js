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
  //
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeApps, setActiveApps] = useState([]);

  // need a add component
  const launchApp = (appData) => {
    // Update the URL to reflect the appId
    // Todo - this is a temporary solution, don't allow the same app to be launched twice
    const newSearchParams = [...searchParams.getAll("app"), appData.id];
    console.log(newSearchParams);
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
      const app = searchParams.getAll("app")[index];
      const appData = allApps.find((appData) => appData.id === app);
      appsToShow.push(
        <AppWindow appData={appData} key={app}>
          {appData.component}
        </AppWindow>
      );
    }

    setActiveApps(appsToShow);
  }, [searchParams]);

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
