import { useEffect, useRef, useState } from "react";
import AppMenu from "../../components/appMenu/AppMenu";
import "./_AppWindow.scss";

const AppWindow = ({ closeApp, focusApp, appData, children }) => {
  const [draggable, setDraggable] = useState(false);
  const [dragging, setDragging] = useState(false);
  const appWindowRef = useRef(null);
  const [positionDiff, setPositionDiff] = useState({ x: 0, y: 0 });

  // on first render, runs focusApp to give new window the highest z-index
  useEffect(() => {
    focusApp(appData.id);
  }, []);

  // Checks on first render to see if draggable windows should be enabled
  useEffect(() => {
    if (window.innerWidth < 850) {
      setDraggable(false);
    } else if (window.innerWidth > 850) {
      setDraggable(true);
    }
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
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const dragStart = (e) => {
    if (!draggable) {
      return;
    }
    e.preventDefault();
    // e.screenX and screenY represent where the mouse is on the screen
    // i use the ref to get the position of the appWindow
    const { left, top } = appWindowRef.current.getBoundingClientRect();
    // i use the mouse position relative to the appWindow to get the offset
    // but i calculate the right instead of left
    // because the appWindow is positioned right
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
        left = 100;
      }
      if (top < 30) {
        top = 30;
      }
      if (left > window.innerWidth - appWindowRef.current.offsetWidth) {
        left = window.innerWidth - appWindowRef.current.offsetWidth;
      }
      if (top > window.innerHeight - appWindowRef.current.offsetHeight) {
        top = window.innerHeight - appWindowRef.current.offsetHeight;
      }
      appWindowRef.current.style.left = `${left}px`;
      appWindowRef.current.style.top = `${top}px`;
    }
  };

  const dragEnd = () => {
    if (!draggable) {
      return;
    }
    setDragging(false);
  };

  return (
    <>
      <div
        id={appData.id}
        style={{ zIndex: 9999 }}
        className="app-window"
        ref={appWindowRef}
        onMouseDown={(e) => focusApp(appData.id, e)}
        onMouseMove={handleDrag}
        onMouseLeave={dragEnd}
      >
        <section
          onMouseDown={dragStart}
          onMouseUp={dragEnd}
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
        <section className="app-content">{children}</section>
        <section className="app-footer">
          <AppMenu
            liveLink={appData.liveLink}
            gitHubLink={appData.gitHubLink}
            gitHubEmbedLink={appData.gitHubEmbedLink}
          />
        </section>
      </div>
    </>
  );
};

export default AppWindow;
