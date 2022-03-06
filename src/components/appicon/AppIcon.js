import "./_appicon.scss";

const AppIcon = ({ appData }) => {
  return (
    <button>
      <img className="icon-img" src={appData.icon} alt="" />
      <p className="icon-text">{appData.title}</p>
    </button>
  );
};

export default AppIcon;
