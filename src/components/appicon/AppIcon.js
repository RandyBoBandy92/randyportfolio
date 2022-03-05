import "./appicon.scss";

const AppIcon = ({ appData }) => {
  return (
    <button>
      <img src={appData.icon} alt="" />
      <p>{appData.title}</p>
    </button>
  );
};

export default AppIcon;
