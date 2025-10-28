import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { IoCopy } from "react-icons/io5";
import { holiTheme } from "react-syntax-highlighter/dist/esm/styles/prism";

function CodeContainer({codeReview,code}) {
  return (
    <div className="relative">
    <IoCopy className="top-0 right-0 z-5 absolute cursor-pointer   hover:text-orange-600 transition-all hover:scale-200"/>
              <SyntaxHighlighter
                className="f-code"
                language={codeReview.language}
                style={holiTheme}
                showLineNumbers
                wrapLines
                customStyle={{
                  background: "transparent",
                  fontSize: "14px",
                  padding: "1rem",
                  fontFamily: "JetBrains Mono",
                }}
                lineNumberStyle={{ color: "#555" }}
              >
                {code}
              </SyntaxHighlighter>
    </div>
  )
}

export default CodeContainer