import appsData from "../../utilities/appsData";
import AppIcon from "../appicon/AppIcon";
import "./_nav.scss";

const Nav = ({ launchApp }) => {
  return (
    <nav>
      <ul>
        {Object.values(appsData.navigation).map((app) => (
          <li key={app.id}>
            <AppIcon launchApp={launchApp} appData={app} />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
