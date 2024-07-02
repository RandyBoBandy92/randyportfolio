import "./_appMenu.scss";
import arrowLeft from "../../assets/images/icons/arrow-left.svg";
import gitHubIcon from "../../assets/images/icons/github.svg";
import openIcon from "../../assets/images/icons/box-arrow-up-right.svg";
import vsCodeIcon from "../../assets/images/icons/vs-code.svg";
import { useSearchParams } from "react-router-dom";

const AppMenu = ({
  launchApp,
  liveLink = "",
  gitHubLink = "",
  vsCodeId = "",
  title,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const closeApps = () => {
    setSearchParams({ app: [] });
  };
  const noLinks = !liveLink && !gitHubLink && !vsCodeId;
  return (
    <div className={`app-menu ${noLinks ? "hide-app-menu" : ""}`}>
      <ul>
        <li onClick={closeApps} className="app-menu-icon back">
          <button>
            <img src={arrowLeft} alt="Go back to the main screen" />
            <p>Back</p>
          </button>
        </li>
        {gitHubLink && (
          <li className="app-menu-icon github-link">
            <a href={gitHubLink} target="_blank" rel="noopener noreferrer">
              <img src={gitHubIcon} alt={`GitHub icon`} />
              <p>Code</p>
            </a>
          </li>
        )}
        {liveLink && (
          <li className="app-menu-icon live-site-link">
            <a href={liveLink} target="_blank" rel="noopener noreferrer">
              <img src={openIcon} alt="Live site icon" />
              <p>View</p>
            </a>
          </li>
        )}
        {vsCodeId && (
          <li
            onClick={() => launchApp({ id: vsCodeId })}
            className="app-menu-icon vs-code"
          >
            <button>
              <img
                src={vsCodeIcon}
                alt={`Launch the Vs Code app to view ${title} repository`}
              />
              <p>VS Code</p>
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default AppMenu;
