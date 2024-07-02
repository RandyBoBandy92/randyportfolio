import "./_history.scss";
import { useEffect, useRef } from "react";

export default function History({ history, resetCalculations }) {
  const ref = useRef()

  useEffect(() => {
    ref.current.scrollTo({top: ref.current.scrollHeight})
  }, [history])

  return (
    <ul ref={ref} style={history.length === 0 ? {justifyContent: "center"} : null} className="history">
      {history.length > 0 ? (history.map((historyData, i) => (
        <li key={i}>
          <button onClick={() => resetCalculations(false, historyData)}>
            <span>{historyData.display}</span><span>= {historyData.result}</span>
          </button>
        </li>
      ))) : (<li style={{flexDirection: "column", alignItems: "center", fontSize: "2rem", opacity: "0.5"}}><span>HISTORY</span><span style={{fontSize: "1rem"}}>(click to restore prev. calculations)</span></li>)}
      
    </ul>
  );
}
