import Markdown from "markdown-to-jsx";
import { useEffect, useState } from "react";
import appsData from "../../utilities/appsData";
import AppIcon from "../appicon/AppIcon";
import Code from "../code/Code";
import "./_post.scss";

const Img = (props) => {
  if (props.srcSet) {
    // break down the string into an array
    const srcSetArray = props.srcSet.split(",");
    // remove the \n from the array
    srcSetArray.forEach((src, index) => {
      srcSetArray[index] = src.replace(/\n/g, "");
    });
    // add the full file path to each item in the array
    const srcSetArrayWithPath = srcSetArray.map((item) => {
      return `/markdown/${props.postName}/${item}`;
    });
    // join the array back into a string
    const srcSet = srcSetArrayWithPath.join(",");
    return (
      <img
        src={`/markdown/${props.postName}/${props.src}`}
        srcSet={srcSet}
        alt={props.alt}
        className={"post-img"}
        sizes={props.sizes}
        loading="lazy"
        height="auto"
      />
    );
  }
  return (
    <img
      className="post-img"
      src={`/markdown/${props.postName}/${props.src}`}
      alt={props.alt}
      loading="lazy"
      height="auto"
    />
  );
};

const Source = (props) => {
  return (
    <source src={`/markdown/${props.postName}/${props.src}`} type="video/mp4" />
  );
};

const Post = ({ appId, postName }) => {
  const [postContent, setPostContent] = useState("");
  const appData = appsData.projects[appId];
  useEffect(() => {
    fetch(`/markdown/${postName}/${postName}.md`)
      .then((response) => response.text())
      .then((text) => setPostContent(text))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="post">
      <div className="post-info-header">
        <h2>App Info</h2>
        <AppIcon appData={appData} />
      </div>
      <Markdown
        className="post-content"
        options={{
          overrides: {
            code: {
              component: Code,
            },
            img: {
              component: Img,
              props: { postName: postName },
            },
            source: {
              component: Source,
              props: { postName: postName },
            },
          },
        }}
      >
        {postContent}
      </Markdown>
    </div>
  );
};

export default Post;
