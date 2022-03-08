import "./_contact.scss";
import logoWhite from "../../assets/images/logo/white/logoFullResWhite.png";
import copyIcon from "../../assets/images/icons/copy.svg";

const Contact = () => {
  const email = "randy@randygulak.com";
  const copyEmail = () => {
    navigator.clipboard.writeText(email);
  };
  return (
    <div className="contact">
      <span className="email-link">
        <a href={`mailto:${email}`}>{email}</a>
        <button onClick={copyEmail} className="copy-email">
          <img src={copyIcon} alt="" />
        </button>
      </span>
      <p>(no spam pls.)</p>
      <img className="contact-background" src={logoWhite} alt="" />
    </div>
  );
};

export default Contact;
