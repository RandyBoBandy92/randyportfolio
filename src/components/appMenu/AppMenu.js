import "./_appMenu.scss";
import arrowLeft from "../../assets/images/icons/arrow-left.svg";
import gitHubIcon from "../../assets/images/icons/github.svg";
import openIcon from "../../assets/images/icons/box-arrow-up-right.svg";
import { useSearchParams } from "react-router-dom";

const AppMenu = ({ liveLink = "", gitHubLink = "" }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const closeApps = () => {
    setSearchParams({ app: [] });
  };
  return (
    <div className="app-menu">
      <ul>
        <li onClick={closeApps} className="app-menu-icon back">
          <img src={arrowLeft} alt="" />
          <p>Back</p>
        </li>
        {gitHubLink && (
          <li className="app-menu-icon github-link">
            <a href={gitHubLink} target="_blank" rel="noopener noreferrer">
              <img src={gitHubIcon} alt="" />
              <p>Code</p>
            </a>
          </li>
        )}
        {liveLink && (
          <li className="app-menu-icon live-site-link">
            <a href={liveLink} target="_blank" rel="noopener noreferrer">
              <img src={openIcon} alt="" />
              <p>View</p>
            </a>
          </li>
        )}
      </ul>
    </div>
  );
};

export default AppMenu;
