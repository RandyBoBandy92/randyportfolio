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

const appsData = {
  navigation: {
    about: {
      id: "about",
      external: false,
      title: "About",
      icon: aboutIcon,
    },
    contact: {
      id: "contact",
      external: false,
      title: "Contact",
      icon: contactIcon,
    },
    blog: {
      id: "blog",
      external: true,
      title: "Blog",
      icon: blogIcon,
    },
    garden: {
      id: "garden",
      external: true,
      title: "Garden",
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
    },
    bDMI: {
      id: "bDMI",
      external: false,
      title: "bDMI",
      icon: bdmiIcon,
    },
    iChing: {
      id: "i-ching",
      external: false,
      title: "I-Ching",
      icon: iChingIcon,
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
