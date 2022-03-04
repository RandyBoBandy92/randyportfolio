import About from "../../assets/images/AboutIcon.svg";
import Blog from "../../assets/images/BlogIcon.svg";
import Contact from "../../assets/images/ContactIcon.svg";
import Projects from "../../assets/images/ProjectsIcon.svg";

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <img src={About} alt="" />
        </li>
        <li>
          <img className="contact" src={Contact} alt="" />
        </li>
        <li>
          <img src={Projects} alt="" />
        </li>
        <li>
          <a href="https://blog.randygulak.com">
            <img src={Blog} alt="" />
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
