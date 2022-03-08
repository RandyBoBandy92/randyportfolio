import Markdown from "markdown-to-jsx";
import { useEffect, useState } from "react";

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
      <Markdown>{postContent}</Markdown>
    </div>
  );
};

export default Post;
