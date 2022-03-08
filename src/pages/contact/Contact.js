import "./_contact.scss";
import logoWhite from "../../assets/images/logo/white/logoFullResWhite.png";
import copyIcon from "../../assets/images/icons/copy.svg";
import { useState } from "react";
import AppMenu from "../../components/appMenu/AppMenu";

const Contact = () => {
  const [copyClick, setCopyClick] = useState(false);
  const email = "randy@randygulak.com";
  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopyClick(true);
    setTimeout(() => {
      setCopyClick(false);
    }, 1500);
  };
  return (
    <>
      <div className="contact">
        <span className="email-link">
          <a href={`mailto:${email}`}>{email}</a>
          <button
            onClick={copyEmail}
            className={`copy-email${copyClick ? " active" : ""}`}
          >
            <img src={copyIcon} alt="" />
          </button>
        </span>
        <p>(no spam pls.)</p>
        <img className="contact-background" src={logoWhite} alt="" />
      </div>
      <AppMenu />
    </>
  );
};

export default Contact;
