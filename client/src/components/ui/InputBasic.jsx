import { Send, Paperclip, X } from 'lucide-react';
import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { holiTheme } from 'react-syntax-highlighter/dist/esm/styles/prism';


function InputBasic({ onReviewComplete }) {
  const [code, setCode] = useState('');
  const [prompt, setPrompt] = useState('');
  const [codeSnippets, setCodeSnippets] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const MAX_SNIPPETS = 3;

  // ADD THIS CLEANUP FUNCTION
  const cleanJSONResponse = (text) => {
    // Remove markdown code blocks (``````)
    let cleaned = text.replace(/``````\s*/g, '');
    
    // Remove leading/trailing whitespace
    cleaned = cleaned.trim();
    
    // If there's extra text before or after JSON, extract just the JSON part
    const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return jsonMatch[0];
    }
    
    return cleaned;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (codeSnippets.length === 0) return;

    setIsSubmitting(true);

    try {
      // Combine all code snippets
      const combinedCode = codeSnippets.map((s, i) => 
        `// Code Snippet ${i + 1}\n${s.code}`
      ).join('\n\n');

      const response = await fetch('http://localhost:3001/prompts/review-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, code: combinedCode })
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let jsonParts = '';

      const processBuffer = (chunkStr) => {
        buffer += chunkStr;
        const events = buffer.split('\n\n');
        buffer = events.pop(); // keep partial

        for (const ev of events) {
          const lines = ev.split('\n').map(l => l.trim()).filter(Boolean);
          for (const line of lines) {
            if (!line.startsWith('data:')) continue;
            const payload = line.replace(/^data:\s*/, '');
            try {
              const data = JSON.parse(payload);

              if (data.status === 'started') {
                onReviewComplete({
                  prompt: prompt || 'Code review in progress...',
                  code: combinedCode,
                  review: 'Starting code review...',
                  isStreaming: true
                });
              } else if (data.status === 'completed') {
                try {
                  // APPLY CLEANING HERE BEFORE PARSING
                  const cleanedJSON = cleanJSONResponse(jsonParts);
                  console.log('Cleaned JSON:', cleanedJSON.substring(0, 200) + '...'); // Debug first 200 chars
                  
                  const parsedReview = JSON.parse(cleanedJSON);
                  onReviewComplete({
                    ...parsedReview,
                    isStreaming: false,
                    timestamp: new Date().toISOString()
                  });
                } catch (parseError) {
                  console.error('Failed to parse final JSON:', parseError);
                  console.error('Raw jsonParts:', jsonParts); // Debug raw data
                  onReviewComplete({
                    prompt: prompt || 'Review completed with errors',
                    code: combinedCode,
                    review: 'Error: Could not parse the review data.',
                    isStreaming: false,
                    isError: true
                  });
                }
              } else if (data.content) {
                jsonParts += data.content;
                onReviewComplete({
                  prompt: prompt || 'Code review in progress...',
                  code: combinedCode,
                  review: jsonParts,
                  isStreaming: true
                });
              }

            } catch (err) {
              console.error('Error processing SSE payload:', err);
            }
          }
        }
      };

      // Read the stream
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        processBuffer(chunk);
      }

      // Process any remaining buffer
      if (buffer) processBuffer('\n\n');

      // Clear form
      setCodeSnippets([]);
      setCode('');
      setPrompt('');

    } catch (error) {
      console.error('Error:', error);
      alert('Failed to get code review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePaste = (e) => {
    const text = e.clipboardData.getData('text');
    if (text.length > 20) {
      e.preventDefault();
      
      if (codeSnippets.length >= MAX_SNIPPETS) {
        alert(`Maximum limit reached! You can only add up to ${MAX_SNIPPETS} code snippets.`);
        return;
      }
      
      setCodeSnippets([...codeSnippets, { id: Date.now(), code: text }]);
      setCode('');
    }
  };

  const handleManualAdd = () => {
    if (code.trim().length === 0) {
      alert('Please enter some code before adding.');
      return;
    }

    if (codeSnippets.length >= MAX_SNIPPETS) {
      alert(`Maximum limit reached! You can only add up to ${MAX_SNIPPETS} code snippets.`);
      return;
    }

    setCodeSnippets([...codeSnippets, { id: Date.now(), code: code }]);
    setCode('');
  };

  const removeSnippet = (id) => {
    setCodeSnippets(codeSnippets.filter(snippet => snippet.id !== id));
  };

  return (
    <div className="w-full mt-5">
      <form onSubmit={handleSubmit}>
        {/* Optional Prompt Input */}
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="What should I focus on? (optional)"
          className="w-full mb-3 px-5 py-2.5 bg-zinc-900 border-2 border-zinc-700 rounded-xl text-gray-100 placeholder-zinc-500 focus:outline-none focus:border-teal-600"
        />

        {/* Code Input Area */}
        <div className="relative bg-zinc-900 border-2 border-zinc-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 focus-within:border-teal-600 focus-within:shadow-teal-600/20">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onPaste={handlePaste}
            placeholder="Paste your code here for review..."
            rows={1}
            disabled={isSubmitting}
            className="w-full px-5 py-3.5 pr-28 bg-transparent rounded-2xl resize-none focus:outline-none text-gray-100 placeholder-zinc-500 max-h-64 overflow-y-auto"
            style={{
              minHeight: '52px',
              height: 'auto'
            }}
            onInput={(e) => {
              e.target.style.height = 'auto';
              e.target.style.height = Math.min(e.target.scrollHeight, 256) + 'px';
            }}
          />
          
          {/* Snippet Counter Badge */}
          {codeSnippets.length > 0 && (
            <div className="absolute left-3 bottom-3 px-2.5 py-1 bg-teal-600/20 backdrop-blur-sm rounded-lg text-xs font-medium text-teal-400 border border-teal-600/30">
              {codeSnippets.length}/{MAX_SNIPPETS} snippets
            </div>
          )}

          {/* Button Container */}
          <div className="absolute right-2 bottom-2 flex items-center gap-2">
            <button
              type="button"
              onClick={handleManualAdd}
              disabled={codeSnippets.length >= MAX_SNIPPETS || isSubmitting}
              className={`p-2.5 rounded-xl transition-all duration-200 ${
                codeSnippets.length >= MAX_SNIPPETS || isSubmitting
                  ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                  : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-300'
              }`}
              aria-label="Add code snippet"
            >
              <Paperclip className="w-5 h-5" />
            </button>
            
            <button
              type="submit"
              disabled={codeSnippets.length === 0 || isSubmitting}
              className={`p-2.5 rounded-xl transition-all duration-200 ${
                codeSnippets.length > 0 && !isSubmitting
                  ? 'bg-teal-600 hover:bg-teal-500 text-white shadow-md hover:shadow-lg hover:shadow-teal-600/30'
                  : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
              }`}
              aria-label="Submit code for review"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Code Snippets Display */}
      {codeSnippets.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-3">
          {codeSnippets.map((snippet, index) => (
            <div
              key={snippet.id}
              className="relative code-review-display h-30 w-30 md:w-[200px] md:h-[200px] rounded-xl bg-zinc-900 border-2 border-zinc-700 overflow-hidden shadow-lg hover:border-teal-600/50 transition-all duration-200"
            >
              <button
                type="button"
                onClick={() => removeSnippet(snippet.id)}
                disabled={isSubmitting}
                className="absolute top-2 right-2 z-10 p-1.5 rounded-lg bg-zinc-800/90 hover:bg-red-600 text-zinc-400 hover:text-white transition-all duration-200 backdrop-blur-sm"
                aria-label="Remove code snippet"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-full h-full overflow-auto p-3">
                <SyntaxHighlighter
                  language="javascript"
                  style={holiTheme}
                  showLineNumbers
                  wrapLines
                  customStyle={{
                    background: 'transparent',
                    fontSize: '10px',
                    padding: '0',
                    fontFamily: 'JetBrains Mono, monospace',
                    margin: 0,
                  }}
                  lineNumberStyle={{ color: '#555', fontSize: '10px' }}
                >
                  {snippet.code}
                </SyntaxHighlighter>
              </div>

              <div className="absolute bottom-2 left-2 px-2 py-1 bg-zinc-800/90 backdrop-blur-sm rounded-md text-xs text-zinc-400">
                Snippet {index + 1}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default InputBasic;
