import "./_AppWindow.scss";

const appWindow = ({ children }) => {
  return (
    <section className="app-window">
      {children}
      <div className="app-window-footer"></div>
    </section>
  );
};

export default appWindow;
