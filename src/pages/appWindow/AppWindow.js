import { useEffect, useRef, useState } from "react";
import AppMenu from "../../components/appMenu/AppMenu";
import "./_AppWindow.scss";

const AppWindow = ({ launchApp, closeApp, focusApp, appData, children }) => {
  const [draggable, setDraggable] = useState(false);
  const [dragging, setDragging] = useState(false);
  const appWindowRef = useRef(null);
  const [positionDiff, setPositionDiff] = useState({ x: 0, y: 0 });

  // on first render, runs focusApp to give new window the highest z-index
  useEffect(() => {
    focusApp(appData.id);
  }, []);

  // Checks on every resize event to see if draggable windows should be enabled
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 850) {
        setDraggable(false);
        // remove all inline styles on the appWindow
        appWindowRef.current.removeAttribute("style");
      } else if (window.innerWidth > 850) {
        setDraggable(true);
      }
    };
    window.addEventListener("resize", handleResize);
    // Call it once so it also fires on first render.
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const startDrag = (e) => {
    if (!draggable) {
      return;
    }
    e.preventDefault();
    // e.screenX and screenY represent where the mouse is on the screen
    // i use the ref to get the position of the appWindow
    const { left, top } = appWindowRef.current.getBoundingClientRect();
    // i use the mouse position relative to the appWindow to get the offset
    const offsetX = e.screenX - left;
    const offsetY = e.screenY - top;
    setPositionDiff({ x: offsetX, y: offsetY });

    setDragging(true);
  };

  const handleDrag = (e) => {
    if (!draggable) {
      return;
    }
    if (dragging) {
      let left = e.screenX - positionDiff.x;
      let top = e.screenY - positionDiff.y;
      // if the appWindow is dragged off the screen, it will be moved back
      if (left < 100) {
        // stops before the side navigation
        left = 100;
      }
      if (top < 30) {
        // stops before the header on the top of the viewport
        top = 30;
      }
      if (left > window.innerWidth - appWindowRef.current.offsetWidth) {
        // stops at the right side of the screen
        left = window.innerWidth - appWindowRef.current.offsetWidth;
      }
      if (top > window.innerHeight - appWindowRef.current.offsetHeight) {
        // stops at the bottom of the screen
        top = window.innerHeight - appWindowRef.current.offsetHeight;
      }
      // inline styles are used to move the appWindow
      appWindowRef.current.style.left = `${left}px`;
      appWindowRef.current.style.top = `${top}px`;
    }
  };

  const endDrag = () => {
    if (!draggable) {
      return;
    }
    setDragging(false);
  };

  // codeClass is used to detect when a vs code component is being rendered
  // and adds another class for styling purposes
  const codeClass = appData.id.includes("code") ? "code" : "";

  return (
    <>
      <article
        id={appData.id}
        style={{ zIndex: 9999 }}
        className={`app-window ${appData.id}-window ${codeClass}`}
        ref={appWindowRef}
        onMouseDown={(e) => focusApp(appData.id, e)}
        onMouseMove={handleDrag}
        onMouseLeave={endDrag}
      >
        <section
          onMouseDown={startDrag}
          onMouseUp={endDrag}
          className="app-header"
        >
          <h2>{appData.title}</h2>
          <button
            onClick={() => closeApp(appData)}
            aria-label="Close App"
            className="close-button"
          >
            x
          </button>
        </section>
        {/* tabIndex is for accessibility purposes */}
        <section tabIndex={0} className="app-content">
          {children}
        </section>
        <section className="app-footer">
          <AppMenu
            liveLink={appData.liveLink}
            gitHubLink={appData.gitHubLink}
            vsCodeId={appData.vsCodeId}
            launchApp={launchApp}
            title={appData.title}
          />
        </section>
      </article>
    </>
  );
};

export default AppWindow;
