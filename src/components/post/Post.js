import Markdown from "markdown-to-jsx";
import { useEffect, useState } from "react";
import appsData from "../../utilities/appsData";
import AppIcon from "../appicon/AppIcon";
import Code from "../code/Code";
import "./_post.scss";

const Post = ({ appId, postName }) => {
  const [postContent, setPostContent] = useState("");
  const appData = appsData.projects[appId];
  useEffect(() => {
    import(`../../assets/markdown/${postName}.md`).then((post) => {
      fetch(post.default)
        .then((response) => response.text())
        .then((text) => setPostContent(text))
        .catch((error) => console.log(error));
    });
  }, []);

  return (
    <div className="post">
      <div className="app-info-header">
        <h2>App Info</h2>
        <AppIcon appData={appData} />
      </div>
      <div className="app-info tech">{/* TODO add tech stack component */}</div>
      <Markdown
        className="app-content"
        options={{
          overrides: {
            code: {
              component: Code,
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
