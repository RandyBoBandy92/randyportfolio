import "./_contact.scss";
import logoWhite from "../../assets/images/logo/white/logoFullResWhite.png";
import copyIcon from "../../assets/images/icons/copy.svg";
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

const Contact = () => {
  const [copyClick, setCopyClick] = useState(false);
  const email = "randy@randygulak.com";
  const copyEmail = () => {
    // navigator.clipboard.writeText(email);
    // this worked on desktop, but not on mobile
    // so I'm using the react-copy-to-clipboard library
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
          <CopyToClipboard text={email}>
            <button
              onClick={copyEmail}
              className={`copy-email${copyClick ? " active" : ""}`}
            >
              <img
                height="auto"
                src={copyIcon}
                alt="Copy this email to clipboard"
              />
            </button>
          </CopyToClipboard>
        </span>
        <p>(no spam pls.)</p>
        <img className="contact-background" src={logoWhite} alt="" />
      </div>
    </>
  );
};

export default Contact;
