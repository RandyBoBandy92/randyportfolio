import "./_screen.scss";
import { useEffect, useRef } from "react";

export default function Screen({ calculationDisplay }) {
  const ref = useRef();
  useEffect(() => {
    ref.current.scrollTo({ top: ref.current.scrollHeight });
  }, [calculationDisplay]);
  return (
    <div
      ref={ref}
      className="screen"
      style={
        !calculationDisplay
          ? {
              textAlign: "center",
              color: "gray",
              display: "grid",
              placeItems: "center",
            }
          : null
      }
    >
      {calculationDisplay ? (
        <p style={calculationDisplay === "ERR" ? { color: "red", textAlign: "center" } : null}>
          {calculationDisplay}
        </p>
      ) : (
        <p>SCREEN</p>
      )}
    </div>
  );
}
