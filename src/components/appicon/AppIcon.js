import "./_appicon.scss";

const AppIcon = ({ appData, launchApp }) => {
  if (appData.external) {
    return (
      <a
        className={`icon icon-${appData.id}`}
        href={appData.hyperlink}
        target="_blank"
        rel="noreferrer noopener"
      >
        <img className="icon-img" src={appData.icon} alt="" />
        <p className="icon-text">{appData.title}</p>
      </a>
    );
  }
  return (
    <button
      onClick={launchApp ? () => launchApp(appData) : null}
      className={`icon icon-${appData.id}`}
    >
      <img className="icon-img" src={appData.icon} alt="" />
      <p className="icon-text">{appData.title}</p>
    </button>
  );
};

export default AppIcon;
