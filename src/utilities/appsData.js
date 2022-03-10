// Import assets
import aboutIcon from "../assets/images/icons/about.svg";
import contactIcon from "../assets/images/icons/contact.svg";
import blogIcon from "../assets/images/icons/blog.svg";
import gardenIcon from "../assets/images/icons/obsidian.svg";
import fetchIcon from "../assets/images/icons/fetch.svg";
import rayBikeIcon from "../assets/images/icons/raybikesupreme.png";
import bdmiIcon from "../assets/images/icons/bdmi.svg";
import iChingIcon from "../assets/images/icons/Iching-hexagram-56new.svg";
import logoIcon from "../assets/images/logo/black/favicon-32x32.png";
// Import components
import Contact from "../pages/contact/Contact";
import About from "../pages/about/About";
import Post from "../components/post/Post";

const appsData = {
  navigation: {
    about: {
      id: "about",
      external: false,
      title: "About",
      icon: aboutIcon,
      component: <About />,
    },
    contact: {
      id: "contact",
      external: false,
      title: "Contact",
      icon: contactIcon,
      component: <Contact />,
    },
    blog: {
      id: "blog",
      external: true,
      title: "Blog",
      hyperlink: "https://blog.randygulak.com/",
      icon: blogIcon,
    },
    garden: {
      id: "garden",
      external: true,
      title: "Garden",
      hyperlink: "https://publish.obsidian.md/randybobandy/Garden+entrance",
      icon: gardenIcon,
    },
  },
  projects: {
    fetch: {
      id: "fetch",
      external: false,
      title: "Fetch",
      icon: fetchIcon,
    },
    rayBikeSupreme: {
      id: "ray-bike-supreme",
      external: false,
      title: "Ray Bike Supreme",
      icon: rayBikeIcon,
      liveLink: "https://www.randygulak.com/RayBikeSupreme/",
      gitHubLink: "",
      component: <Post appId="rayBikeSupreme" postName={"rayBikeSupreme"} />,
    },
    bDMI: {
      id: "bDMI",
      external: false,
      title: "bDMI",
      icon: bdmiIcon,
      liveLink: "https://www.randygulak.com/bdmi/",
      gitHubLink: "https://github.com/RandyBoBandy92/moviedatabase",
    },
    iChing: {
      id: "i-ching",
      external: false,
      title: "I-Ching",
      icon: iChingIcon,
      liveLink: "https://randybobandy92.github.io/ReactIChing/",
      gitHubLink: "https://github.com/RandyBoBandy92/ReactIChing",
      component: <Post appId="iChing" postName={"iChingReact"} />,
    },
    portfolio: {
      id: "portfolio",
      external: false,
      title: "Portfolio",
      icon: logoIcon,
    },
  },
};

export default appsData;
