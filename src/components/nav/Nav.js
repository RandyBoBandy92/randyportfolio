import About from "../../assets/images/AboutIcon.svg";
import Blog from "../../assets/images/BlogIcon.svg";
import Contact from "../../assets/images/ContactIcon.svg";
import Projects from "../../assets/images/ProjectsIcon.svg";
import "./nav.scss";

const Nav = () => {
  return (
    <nav>
      <ul>
        <li className="nav-item">
          <img className="about-icon" src={About} alt="" />
          <p className="nav-text">About</p>
        </li>
        <li className="nav-item">
          <img className="contact-icon" src={Contact} alt="" />
          <p className="nav-text">Contact</p>
        </li>
        <li className="nav-item">
          <img className="project-icon" src={Projects} alt="" />
          <p className="nav-text">Projects</p>
        </li>
        <li className="nav-item">
          <a href="https://blog.randygulak.com">
            <img className="blog-icon" src={Blog} alt="" />
            <p className="nav-text">Blog</p>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
