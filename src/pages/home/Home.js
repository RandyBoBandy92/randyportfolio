import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import AppIcon from "../../components/appicon/AppIcon";
import appsData from "../../utilities/appsData";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./_home.scss";

const Home = () => {
  //   const [activeApps, setActiveApps] = useState([]);
  //   const [searchParams, setSearchParams] = useSearchParams();
  //   useEffect(() => {
  //     // every time search params is updated, we loop over the contents of app
  //     const appsToLaunch = [];
  //     setActiveApps(appsToLaunch);
  //   }, [searchParams]);
  return (
    <div id="app">
      <Header />
      <main>
        <section className="projects">
          {Object.values(appsData.projects).map((app) => (
            <AppIcon key={app.id} appData={app} />
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
