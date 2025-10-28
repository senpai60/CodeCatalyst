import { Send, Paperclip, X } from 'lucide-react';
import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { holiTheme } from 'react-syntax-highlighter/dist/esm/styles/prism';

function InputBasic() {
  const [code, setCode] = useState('');
  const [codeSnippets, setCodeSnippets] = useState([]);
  const MAX_SNIPPETS = 3;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (codeSnippets.length > 0) {
      console.log('Submitting code snippets for review:', codeSnippets);
      // Here you would handle the code submission
      setCodeSnippets([]);
      setCode('');
    }
  };

  const handlePaste = (e) => {
    const text = e.clipboardData.getData('text');
    if (text.length > 20) {
      e.preventDefault();
      
      // Check if limit reached
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

    // Check if limit reached
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
        {/* Input Area */}
        <div className="relative bg-zinc-900 border-2 border-zinc-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 focus-within:border-orange-600 focus-within:shadow-orange-600/20">
          {/* Textarea */}
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onPaste={handlePaste}
            placeholder="Paste your code here for review..."
            rows={1}
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
            <div className="absolute left-3 bottom-3 px-2.5 py-1 bg-orange-600/20 backdrop-blur-sm rounded-lg text-xs font-medium text-orange-400 border border-orange-600/30">
              {codeSnippets.length}/{MAX_SNIPPETS} snippets
            </div>
          )}

          {/* Button Container */}
          <div className="absolute right-2 bottom-2 flex items-center gap-2">
            {/* Attach/Add Button */}
            <button
              type="button"
              onClick={handleManualAdd}
              disabled={codeSnippets.length >= MAX_SNIPPETS}
              className={`p-2.5 rounded-xl transition-all duration-200 ${
                codeSnippets.length >= MAX_SNIPPETS
                  ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                  : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-300'
              }`}
              aria-label="Add code snippet"
              title={codeSnippets.length >= MAX_SNIPPETS ? 'Maximum limit reached' : 'Add code snippet'}
            >
              <Paperclip className="w-5 h-5" />
            </button>
            
            {/* Send Button */}
            <button
              type="submit"
              disabled={codeSnippets.length === 0}
              className={`p-2.5 rounded-xl transition-all duration-200 ${
                codeSnippets.length > 0
                  ? 'bg-orange-600 hover:bg-orange-500 text-white shadow-md hover:shadow-lg hover:shadow-orange-600/30'
                  : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
              }`}
              aria-label="Submit code for review"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </form>

      {/* Code Snippets Display - Fixed Size Boxes */}
      {codeSnippets.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-3">
          {codeSnippets.map((snippet) => (
            <div
              key={snippet.id}
              className="relative code-review-display h-30 w-30 md:w-[200px] md:h-[200px] rounded-xl bg-zinc-900 border-2 border-zinc-700 overflow-hidden shadow-lg hover:border-orange-600/50 transition-all duration-200"
            >
              {/* Remove Button */}
              <button
                type="button"
                onClick={() => removeSnippet(snippet.id)}
                className="absolute top-2 right-2 z-10 p-1.5 rounded-lg bg-zinc-800/90 hover:bg-red-600 text-zinc-400 hover:text-white transition-all duration-200 backdrop-blur-sm"
                aria-label="Remove code snippet"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Code Display */}
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

              {/* Snippet Counter Badge */}
              <div className="absolute bottom-2 left-2 px-2 py-1 bg-zinc-800/90 backdrop-blur-sm rounded-md text-xs text-zinc-400">
                Snippet {codeSnippets.indexOf(snippet) + 1}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default InputBasic;
