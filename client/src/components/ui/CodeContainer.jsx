import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { IoCopy } from "react-icons/io5";
import { holiTheme } from "react-syntax-highlighter/dist/esm/styles/prism";

function CodeContainer({ codeReview, code }) {
  return (
    <div className="relative w-full">
      <IoCopy className="absolute top-2 right-2 z-10 cursor-pointer hover:text-orange-600 transition-all hover:scale-110 text-xl sm:text-2xl" />
      <div className="relative w-full overflow-x-auto">
        <SyntaxHighlighter
          className="f-code"
          language={codeReview.language}
          style={holiTheme}
          showLineNumbers
          wrapLines
          customStyle={{
            background: "transparent",
            fontSize: "12px",
            padding: "0.5rem",
            fontFamily: "JetBrains Mono",
          }}
          lineNumberStyle={{ color: "#555" }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

export default CodeContainer;
