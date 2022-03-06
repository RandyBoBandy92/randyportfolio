import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import AppIcon from "../../components/appicon/AppIcon";
import appsData from "../../utilities/appsData";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./home.scss";

const Home = () => {
  //   const [activeApps, setActiveApps] = useState([]);
  //   const [searchParams, setSearchParams] = useSearchParams();
  //   useEffect(() => {
  //     // every time search params is updated, we loop over the contents of app
  //     const appsToLaunch = [];
  //     setActiveApps(appsToLaunch);
  //   }, [searchParams]);
  return (
    <div id="root">
      <Header />
      <main style={{ backgroundColor: "#000000" }}>
        <AppIcon appData={appsData.about} />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
