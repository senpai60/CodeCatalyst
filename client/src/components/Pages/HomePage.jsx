import { useState } from 'react';
import CodeContainer from "../ui/CodeContainer";
import InputBasic from "../ui/InputBasic";

function HomePage({ dummyCodeReview }) {
  const [reviews, setReviews] = useState([]);
  const [streamingReview, setStreamingReview] = useState(null);

  const handleReviewComplete = (reviewData) => {
    if (reviewData.isStreaming) {
      // Update streaming review in real-time
      setStreamingReview(reviewData);
    } else {
      // Add completed review to history
      setReviews(prev => [reviewData, ...prev]);
      setStreamingReview(null);
    }
  };

  return (
    <section className="left-main h-full">
      
      <section className="w-full px-3 sm:px-2 pb-2">
        <InputBasic onReviewComplete={handleReviewComplete} />
      </section>

      <section className="code-review-display h-[75svh] overflow-y-auto w-full md:px-10">
        
        {/* Streaming Review (Real-time) */}
        {streamingReview && (
          <div className="review mt-6 sm:mt-10 space-y-4 sm:space-y-6 animate-pulse">
            <p className="text-xs sm:text-sm text-gray-400 italic px-2 sm:px-10 md:px-20 my-3 sm:my-5">
              🧩 {streamingReview.prompt}
            </p>

            <div className="code rounded-lg sm:rounded-2xl sm:p-6 md:p-10 bg-zinc-900 relative">
              <pre className="text-xs sm:text-sm text-gray-300 whitespace-pre-wrap p-4">
                {streamingReview.code.substring(0, 200)}...
              </pre>
            </div>

            <div className="px-2 sm:px-10 md:px-20 mt-4 sm:mt-6 text-xs sm:text-sm text-gray-300">
              <div className="flex items-center gap-2 text-orange-400">
                <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" />
                <span className="font-semibold">Streaming Review...</span>
              </div>
              <div className="mt-3 whitespace-pre-wrap">
                {typeof streamingReview.review === 'string' 
                  ? streamingReview.review 
                  : JSON.stringify(streamingReview.review, null, 2)}
              </div>
            </div>
          </div>
        )}

        {/* Completed Reviews - THIS IS THE KEY FIX */}
        {reviews.map((reviewData, reviewIndex) => {
          // Check if review is an object (parsed JSON) or string
          const isObjectReview = reviewData.review && typeof reviewData.review === 'object';
          
          return (
            <div
              key={reviewIndex}
              className="review mt-6 sm:mt-10 space-y-4 sm:space-y-6"
            >
              <p className="text-xs sm:text-sm text-gray-400 italic px-2 sm:px-10 md:px-20 my-3 sm:my-5">
                🧩 {reviewData.prompt}
              </p>

              <div className="code rounded-lg sm:rounded-2xl sm:p-6 md:p-10 bg-zinc-900 relative">
                <CodeContainer 
                  codeReview={{ language: reviewData.language || 'javascript' }} 
                  code={reviewData.code} 
                />
              </div>

              {/* Render based on review type */}
              {isObjectReview ? (
                <div className="px-2 sm:px-10 md:px-20 mt-4 sm:mt-6 text-xs sm:text-sm text-gray-300 space-y-3 sm:space-y-4">
                  <p className="break-words">
                    <span className="font-semibold text-emerald-400">
                      Overall Review:
                    </span>{" "}
                    {reviewData.review.overall} ({reviewData.review.score}/10)
                  </p>

                  <div>
                    <p className="font-semibold text-blue-400 mb-1 sm:mb-2">✅ Strengths</p>
                    <ul className="list-disc list-inside text-gray-400 space-y-1 pl-2">
                      {reviewData.review.strengths?.map((s, i) => (
                        <li key={i} className="break-words">{s}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold text-rose-400 mb-1 sm:mb-2">⚠️ Issues</p>
                    <ul className="list-disc list-inside text-gray-400 space-y-2 pl-2">
                      {reviewData.review.issues?.map((issue, i) => (
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

                  <div>
                    <p className="font-semibold text-indigo-400 mb-2 sm:mb-3">
                      ✨ Improved Code Suggestion
                    </p>
                    <div className="code rounded-lg sm:rounded-2xl p-4 sm:p-6 md:p-10 bg-zinc-900">
                      <CodeContainer
                        codeReview={{ language: reviewData.language || 'javascript' }}
                        code={reviewData.review.improvedCode}
                      />
                    </div>
                  </div>

                  <div>
                    <p className="font-semibold text-amber-400 mb-1 sm:mb-2">
                      🧠 Recommendations
                    </p>
                    <ul className="list-disc list-inside text-gray-400 space-y-1 pl-2">
                      {reviewData.review.recommendations?.map((r, i) => (
                        <li key={i} className="break-words">{r}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-3 sm:mt-4 text-xs text-gray-500 space-y-1">
                    <p>
                      📊 <span className="font-semibold">Complexity:</span>{" "}
                      {reviewData.review.complexity}
                    </p>
                    <p>
                      🧾 <span className="font-semibold">Readability:</span>{" "}
                      {reviewData.review.readability}
                    </p>
                    <p>
                      🧩 <span className="font-semibold">Maintainability:</span>{" "}
                      {reviewData.review.maintainability}
                    </p>
                  </div>
                </div>
              ) : (
                // Fallback for string review
                <div className="px-2 sm:px-10 md:px-20 mt-4 sm:mt-6 text-xs sm:text-sm text-gray-300 whitespace-pre-wrap">
                  {reviewData.review}
                </div>
              )}
            </div>
          );
        })}

        {/* Dummy Data for Reference */}
        {/* {dummyCodeReview.map((codeReview, reviewIndex) => (
          <div
            key={`dummy-${reviewIndex}`}
            className="review mt-6 sm:mt-10 space-y-4 sm:space-y-6"
          >
            <p className="text-xs sm:text-sm text-gray-400 italic px-2 sm:px-10 md:px-20 my-3 sm:my-5">
              🧩 {codeReview.prompt}
            </p>

            <div className="code rounded-lg sm:rounded-2xl sm:p-6 md:p-10 bg-zinc-900 relative">
              <CodeContainer codeReview={codeReview} code={codeReview.code} />
            </div>

            <div className="px-2 sm:px-10 md:px-20 mt-4 sm:mt-6 text-xs sm:text-sm text-gray-300 space-y-3 sm:space-y-4">
              <p className="break-words">
                <span className="font-semibold text-emerald-400">
                  Overall Review:
                </span>{" "}
                {codeReview.review.overall} ({codeReview.review.score}/10)
              </p>

              <div>
                <p className="font-semibold text-blue-400 mb-1 sm:mb-2">✅ Strengths</p>
                <ul className="list-disc list-inside text-gray-400 space-y-1 pl-2">
                  {codeReview.review.strengths.map((s, i) => (
                    <li key={i} className="break-words">{s}</li>
                  ))}
                </ul>
              </div>

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
        ))} */}
      </section>
    </section>
  );
}

export default HomePage;
