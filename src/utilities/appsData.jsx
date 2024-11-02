// Import assets
import aboutIcon from "../assets/images/icons/about.svg";
import aboutIconAnimated from "../assets/images/logo/RG-small.gif";
import contactIcon from "../assets/images/icons/contact.svg";
import blogIcon from "../assets/images/icons/blog.svg";
import gardenIcon from "../assets/images/icons/obsidian.svg";
import fetchIcon from "../assets/images/icons/fetch.svg";
import rayBikeIcon from "../assets/images/icons/raybikesupreme.png";
import bdmiIcon from "../assets/images/icons/bdmi.svg";
import windowsIcon from "../assets/images/icons/windows.svg";
import iChingIcon from "../assets/images/icons/Iching-hexagram-56new.svg";
import logoIcon from "../assets/images/logo/black/favicon-32x32.png";
import hackerIcon from "../assets/images/icons/code-slash.svg";
import calculatorIcon from "../assets/images/icons/calculator.svg";
import resumeIcon from "../assets/images/icons/resume.svg";
import codePencilIcon from "../assets/images/icons/codePencil.svg";
// Import components
import Contact from "../pages/contact/Contact";
import About from "../pages/about/About";
import Post from "../components/post/Post";
import VsCode from "../components/vsCode/VsCode";
import HackerTyper from "../components/hackerTyper/HackerTyper";
import Calculator from "../components/calculator/Calculator";

// appsData contains both routing information and components
// the schema is flexible, as components which use this data
// for example appIcons inside appMenu only render if matching props are passed

// I used 3 categories to store the data
// I don't think this was the best way to structure the data
// but this is an MVP ok?!

// Schema Properties:
// id: string - used for routing
// external: boolean - used for conditional rendering of the hyperlink property
// title: string - used for appWindow heading and some alt text
// hyperlink (optional): string - used for external links
// icon: image - used for appIcon
// component: component - used for appWindow content
// liveLink (optional): string - used to link to the app's live site
// githubLink (optional): string - used to link to the app's github repo
// vsCodeId (optional): string - used to link to the app's Vs Code app

const appsData = {
  navigation: {
    about: {
      id: "about",
      external: false,
      title: "About",
      icon: aboutIconAnimated,
      component: <About />,
    },
    contact: {
      id: "contact",
      external: false,
      title: "Contact",
      icon: contactIcon,
      component: <Contact />,
    },
    // blog: {
    //   id: "blog",
    //   external: true,
    //   title: "Blog",
    //   hyperlink: "https://blog.randygulak.com/",
    //   icon: blogIcon,
    // },
    // garden: {
    //   id: "garden",
    //   external: true,
    //   title: "Garden",
    //   hyperlink: "https://publish.obsidian.md/randybobandy/Garden+entrance",
    //   icon: gardenIcon,
    // },
  },
  projects: {
    rayBikeSupreme: {
      id: "ray-bike-supreme",
      external: false,
      title: "Ray Bike Supreme",
      icon: rayBikeIcon,
      liveLink: "https://www.randygulak.com/RayBikeSupreme/",
      gitHubLink: "https://github.com/RandyBoBandy92/RayBikeSupreme",
      vsCodeId: "code-ray-bike-supreme",
      component: <Post appId="rayBikeSupreme" postName={"rayBikeSupreme"} />,
    },
    bDMI: {
      id: "bDMI",
      external: false,
      title: "bDMI",
      icon: bdmiIcon,
      liveLink: "https://www.randygulak.com/bdmi/",
      gitHubLink: "https://github.com/RandyBoBandy92/moviedatabase",
      vsCodeId: "code-bdmi",
      component: <Post appId="bDMI" postName={"bdmi"} />,
    },
    iChing: {
      id: "i-ching",
      external: false,
      title: "I-Ching",
      icon: iChingIcon,
      liveLink: "https://randybobandy92.github.io/ReactIChing/",
      gitHubLink: "https://github.com/RandyBoBandy92/ReactIChing",
      vsCodeId: "code-i-ching",
      component: <Post appId="iChing" postName={"iChingReact"} />,
    },
    portfolio: {
      id: "portfolio",
      external: false,
      title: "Portfolio",
      icon: logoIcon,
      liveLink: "https://www.randygulak.com/",
      gitHubLink: "https://github.com/RandyBoBandy92/randyportfolio",
      vsCodeId: "code-portfolio",
      component: <Post appId="portfolio" postName={"portfolio"} />,
    },
    hackerTyper: {
      id: "hacker-typer",
      external: false,
      title: "Hacker Typer",
      icon: hackerIcon,
      component: <HackerTyper />,
    },
    calculator: {
      id: "calculator",
      external: false,
      title: "Calculator",
      icon: calculatorIcon,
      component: <Calculator />,
    },
    windows98: {
      id: "windows98",
      external: true,
      title: "Windows",
      icon: windowsIcon,
      hyperlink: "https://www.randygulak.com/landingPageOld",
    },
    resume: {
      id: "resume",
      external: true,
      title: "Resume",
      icon: resumeIcon,
      hyperlink: "./resume",
    },
    codePencil: {
      id: "code-pencil",
      external: false,
      title: "Code Pencil",
      icon: codePencilIcon,
      liveLink: "https://randybobandy92.github.io/bcit_tutorials/",
      gitHubLink: "https://github.com/RandyBoBandy92/bcit_tutorials",
      vsCodeId: "code-codePencil",
      component: <Post appId="codePencil" postName={"codePencil"} />,
    },
  },
  vsCode: {
    iChing: {
      id: "code-i-ching",
      title: "VS Code - React I-Ching",
      external: false,
      component: (
        <VsCode
          gitHubEmbedLink={"https://github1s.com/RandyBoBandy92/ReactIChing"}
        />
      ),
    },
    rayBikeSupreme: {
      id: "code-ray-bike-supreme",
      title: "VS Code - Ray Bike Supreme",
      external: false,
      component: (
        <VsCode
          gitHubEmbedLink={"https://github1s.com/RandyBoBandy92/RayBikeSupreme"}
        />
      ),
    },
    portfolio: {
      id: "code-portfolio",
      title: "VS Code - Portfolio",
      external: false,
      component: (
        <VsCode
          gitHubEmbedLink={"https://github1s.com/RandyBoBandy92/randyportfolio"}
        />
      ),
    },
    bdmi: {
      id: "code-bdmi",
      title: "VS Code - bDMI",
      external: false,
      component: (
        <VsCode
          gitHubEmbedLink={"https://github1s.com/RandyBoBandy92/moviedatabase"}
        />
      ),
    },
    codePencil: {
      id: "code-codePencil",
      title: "VS Code - Code Pencil",
      external: false,
      component: (
        <VsCode
          gitHubEmbedLink={"https://github1s.com/RandyBoBandy92/bcit_tutorials"}
        />
      ),
    },
  },
};

export default appsData;
