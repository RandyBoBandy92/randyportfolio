import AppMenu from "../../components/appMenu/AppMenu";
import "./_AppWindow.scss";

const appWindow = ({ appData, children }) => {
  return (
    <div className="app-window">
      <section className="app-header">
        <h2>{appData.title}</h2>
      </section>
      <section className="app-content">{children}</section>
      <section className="app-footer">
        <AppMenu />
      </section>
    </div>
  );
};

export default appWindow;
