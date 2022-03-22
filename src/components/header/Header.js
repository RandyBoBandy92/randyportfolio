import { useEffect, useState } from "react";
import Logo from "../../assets/images/logo/white/favicon-32x32.png";
import "./_header.scss";

const Header = () => {
  const [time, setTime] = useState(
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );
  useEffect(() => {
    // create a interval that will run every 5 seconds
    // that updates the time
    const interval = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header>
      <img className="logo" src={Logo} alt="Randy Gulak Portfolio Logo" />
      <p className="clock">{time}</p>
    </header>
  );
};

export default Header;
