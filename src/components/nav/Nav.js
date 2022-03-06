import About from "../../assets/images/AboutIcon.svg";
import Blog from "../../assets/images/BlogIcon.svg";
import Contact from "../../assets/images/ContactIcon.svg";
import Projects from "../../assets/images/ProjectsIcon.svg";
import appsData from "../../utilities/appsData";
import AppIcon from "../appicon/AppIcon";
import "./_nav.scss";

const Nav = () => {
  return (
    <nav>
      <ul>
        {Object.values(appsData.navigation).map((app) => (
          <li key={app.id}>
            <AppIcon appData={app} />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
