import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import json from "react-syntax-highlighter/dist/esm/languages/prism/json";
import vscDarkPlus from "./vsc-dark-plus";

const Code = ({ children, className }) => {
  SyntaxHighlighter.registerLanguage("jsx", jsx);
  SyntaxHighlighter.registerLanguage("json", json);
  // i need to run a split on the className prop to get the language
  const language = className ? className.split("lang-")[1] : "";
  return (
    <SyntaxHighlighter
      showLineNumbers
      className={className ? className : "inline-code"}
      language={language}
      style={vscDarkPlus}
    >
      {children}
    </SyntaxHighlighter>
  );
};

export default Code;
