import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import json from "react-syntax-highlighter/dist/esm/languages/prism/json";
import {
  materialDark,
  materialLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";

const Code = ({ children, className }) => {
  SyntaxHighlighter.registerLanguage("jsx", jsx);
  SyntaxHighlighter.registerLanguage("json", json);
  // i need to run a split on the className prop to get the language
  const language = className ? className.split("lang-")[1] : "";
  return (
    <div className="code">
      <SyntaxHighlighter language={language} style={materialDark}>
        {children}
      </SyntaxHighlighter>
    </div>
  );
};

export default Code;