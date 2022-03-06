// Import assets
import aboutIcon from "../assets/images/icons/about.svg";
import contactIcon from "../assets/images/icons/contact.svg";
import blogIcon from "../assets/images/icons/blog.svg";
import gardenIcon from "../assets/images/icons/obsidian.svg";
import fetchIcon from "../assets/images/icons/fetch.svg";
import rayBikeIcon from "../assets/images/icons/raybikesupreme.png";
import bdmiIcon from "../assets/images/icons/bdmi.svg";
import iChingIcon from "../assets/images/icons/Iching-hexagram-56new.svg";

const appsData = {
  navigation: {
    about: {
      id: "about",
      title: "About",
      icon: aboutIcon,
    },
    contact: {
      id: "contact",
      title: "Contact",
      icon: contactIcon,
    },
    blog: {
      id: "blog",
      title: "Blog",
      icon: blogIcon,
    },
    garden: {
      id: "garden",
      title: "Garden",
      icon: gardenIcon,
    },
  },
  projects: {
    fetch: {
      id: "fetch",
      title: "Fetch",
      icon: fetchIcon,
    },
    rayBikeSupreme: {
      id: "rayBikeSupreme",
      title: "Ray Bike Supreme",
      icon: rayBikeIcon,
    },
    bDMI: {
      id: "bDMI",
      title: "bDMI",
      icon: bdmiIcon,
    },
    iChing: {
      id: "i-ching",
      title: "I-Ching",
      icon: iChingIcon,
    },
  },
};

export default appsData;
