import React, { useState, useEffect } from 'react';

interface JsonResponseDisplayProps {
  jsonString: string;
}

const JsonResponseDisplay: React.FC<JsonResponseDisplayProps> = ({ jsonString }) => {
  const [copyButtonText, setCopyButtonText] = useState('Copy JSON');

  useEffect(() => {
    if (copyButtonText === 'Copied!') {
      const timer = setTimeout(() => {
        setCopyButtonText('Copy JSON');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [copyButtonText]);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString).then(() => {
      setCopyButtonText('Copied!');
    }, (err) => {
      console.error('Could not copy text: ', err);
      setCopyButtonText('Copy Failed');
    });
  };

  return (
    <div className="relative bg-gray-900 border border-gray-700 rounded-lg p-4 font-mono text-sm text-cyan-300">
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 bg-gray-700 hover:bg-gray-600 text-gray-200 text-xs font-sans font-semibold py-1 px-3 rounded-md transition-colors duration-200"
      >
        {copyButtonText}
      </button>
      <pre className="whitespace-pre-wrap break-words">
        <code>{jsonString}</code>
      </pre>
    </div>
  );
};

export default JsonResponseDisplay;