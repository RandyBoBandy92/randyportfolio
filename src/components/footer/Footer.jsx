import Nav from "../nav/Nav";
import "./_footer.scss";
const Footer = ({ launchApp }) => {
  return (
    <footer>
      <Nav launchApp={launchApp} />
    </footer>
  );
};

export default Footer;
