import { useEffect } from "react";
import Logo from "../../assets/images/logo/white/favicon-32x32.png";
import "./header.scss";

const Header = () => {
  // need to write a timeout function to store the current time in a variable

  return (
    <header>
      <img src={Logo} alt="Randy Gulak Portfolio Logo" />
      <p>10:55AM</p>
    </header>
  );
};

export default Header;
