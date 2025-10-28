
import CodeContainer from "../ui/CodeContainer";
import InputBasic from "../ui/InputBasic";
function HomePage({dummyCodeReview}) {
  return (
    <section className="left-main h-full">
      
      <section className="w-full px-3 sm:px-2 pb-2">
        <InputBasic />
      </section>

      <section className="code-review-display h-[75svh] overflow-y-auto w-full md:px-10">
        {dummyCodeReview.map((codeReview, reviewIndex) => (
          <div
            key={reviewIndex}
            className="review mt-6 sm:mt-10 space-y-4 sm:space-y-6"
          >
            <p className="text-xs sm:text-sm text-gray-400 italic px-2 sm:px-10 md:px-20 my-3 sm:my-5">
              🧩 {codeReview.prompt}
            </p>

            {/* --- Code Block --- */}
            <div className="code rounded-lg sm:rounded-2xl sm:p-6 md:p-10 bg-zinc-900 relative">
              <CodeContainer codeReview={codeReview} code={codeReview.code} />
            </div>

            {/* --- Review Summary --- */}
            <div className="px-2 sm:px-10 md:px-20 mt-4 sm:mt-6 text-xs sm:text-sm text-gray-300 space-y-3 sm:space-y-4">
              <p className="break-words">
                <span className="font-semibold text-emerald-400">
                  Overall Review:
                </span>{" "}
                {codeReview.review.overall} ({codeReview.review.score}/10)
              </p>

              {/* Strengths */}
              <div>
                <p className="font-semibold text-blue-400 mb-1 sm:mb-2">✅ Strengths</p>
                <ul className="list-disc list-inside text-gray-400 space-y-1 pl-2">
                  {codeReview.review.strengths.map((s, i) => (
                    <li key={i} className="break-words">{s}</li>
                  ))}
                </ul>
              </div>

              {/* Issues */}
              <div>
                <p className="font-semibold text-rose-400 mb-1 sm:mb-2">⚠️ Issues</p>
                <ul className="list-disc list-inside text-gray-400 space-y-2 pl-2">
                  {codeReview.review.issues.map((issue, i) => (
                    <li key={i} className="break-words">
                      <span className="text-yellow-300 font-medium">
                        {issue.severity.toUpperCase()}
                      </span>
                      {issue.line && (
                        <span className="text-gray-500 ml-1">
                          (Line {issue.line})
                        </span>
                      )}
                      : {issue.issue}
                      <br />
                      <span className="text-green-400 block mt-1">
                        💡 Suggestion: {issue.suggestion}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Improved Code */}
              <div>
                <p className="font-semibold text-indigo-400 mb-2 sm:mb-3">
                  ✨ Improved Code Suggestion
                </p>
                <div className="code rounded-lg sm:rounded-2xl p-4 sm:p-6 md:p-10 bg-zinc-900">
                  <CodeContainer
                    codeReview={codeReview}
                    code={codeReview.review.improvedCode}
                  />
                </div>
              </div>

              {/* Recommendations */}
              <div>
                <p className="font-semibold text-amber-400 mb-1 sm:mb-2">
                  🧠 Recommendations
                </p>
                <ul className="list-disc list-inside text-gray-400 space-y-1 pl-2">
                  {codeReview.review.recommendations.map((r, i) => (
                    <li key={i} className="break-words">{r}</li>
                  ))}
                </ul>
              </div>

              {/* Metrics */}
              <div className="mt-3 sm:mt-4 text-xs text-gray-500 space-y-1">
                <p>
                  📊 <span className="font-semibold">Complexity:</span>{" "}
                  {codeReview.review.complexity}
                </p>
                <p>
                  🧾 <span className="font-semibold">Readability:</span>{" "}
                  {codeReview.review.readability}
                </p>
                <p>
                  🧩 <span className="font-semibold">Maintainability:</span>{" "}
                  {codeReview.review.maintainability}
                </p>
              </div>
            </div>
          </div>
        ))}
      </section>
    </section>
  )
}

export default HomePage