import "./_about.scss";
import profilePic from "../../assets/images/profile.jpg";
import linkedIn from "../../assets/images/icons/linkedin.svg";
import gitHub from "../../assets/images/icons/github.svg";

const About = () => {
  return (
    <>
      <div className="about">
        <img
          height="auto"
          className="profile-pic"
          src={profilePic}
          alt="Randy Gulak standing on the beach at night during low tide"
        />
        <div className="social-icons">
          <a
            href="https://www.linkedin.com/in/ryangulak/"
            className="social-link"
            rel="noreferrer noopener"
            target="_blank"
          >
            <img
              src={linkedIn}
              alt="LinkedIn | Randy Gulak"
              className="social-icon"
            />
          </a>
          <a
            href="https://github.com/RandyBoBandy92"
            className="social-link"
            rel="noreferrer noopener"
            target="_blank"
          >
            <img
              src={gitHub}
              alt="GitHub | RandyBoBandy92"
              className="social-icon"
            />
          </a>
        </div>
        <div className="about-content">
          <div className="about-item device-name">
            <h2>Device Name</h2>
            <h3>Randy Gulak</h3>
          </div>
          <div className="about-item memory-type">
            <h2>Memory Type</h2>
            <h3>Random Access Memory</h3>
          </div>
          <div className="about-item processor">
            <h2>Processor</h2>
            <h3>Caffeine Overclocked</h3>
          </div>
          <div className="about-item built-pc">
            <h2>Built First PC</h2>
            <h3>Age 7</h3>
          </div>
          <div className="about-item broke-pc">
            <h2>Broke First PC</h2>
            <h3>Age 7.001</h3>
          </div>
          <div className="about-item hobbies">
            <h2>Hobbies</h2>
            <h3>Hiking, Reading, Tai Chi, Travel, VR</h3>
          </div>
          <div className="about-item languages">
            <h2>Languages</h2>
            <h3>English, Spanish, HTML, CSS, JavaScript, Python</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
