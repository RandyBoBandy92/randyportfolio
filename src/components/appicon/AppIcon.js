import "./_appicon.scss";

const AppIcon = ({ appData }) => {
  return (
    <button className={`icon ${appData.id}`}>
      <img className="icon-img" src={appData.icon} alt="" />
      <p className="icon-text">{appData.title}</p>
    </button>
  );
};

export default AppIcon;
