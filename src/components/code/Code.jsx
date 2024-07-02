import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import json from "react-syntax-highlighter/dist/esm/languages/prism/json";
import vscDarkPlus from "./vsc-dark-plus";

const Code = ({ children, className, id = "" }) => {
  // Because you can't have <pre> tags in a <p> tag, when I use
  // syntax to refer to functions like this: `checkBounds()`
  // I saw that this returns an empty className
  // so I'm tapping into that to control whether or not to render <pre> tags.
  SyntaxHighlighter.registerLanguage("jsx", jsx);
  SyntaxHighlighter.registerLanguage("json", json);
  // i need to run a split on the className prop to get the language
  const language = className ? className.split("lang-")[1] : "";
  return (
    <SyntaxHighlighter
      showLineNumbers
      id={id ? id : ""}
      className={className ? className : "inline-code"}
      language={language}
      style={vscDarkPlus}
      PreTag={className ? "pre" : "span"}
    >
      {children}
    </SyntaxHighlighter>
  );
};

export default Code;
