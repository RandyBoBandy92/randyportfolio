import Markdown from "markdown-to-jsx";
import { useEffect, useState } from "react";
import Code from "../code/Code";

const Post = ({ postName }) => {
  const [postContent, setPostContent] = useState("");
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
      <Markdown
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
