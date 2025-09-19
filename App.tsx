import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import PromptForm from './components/PromptForm';
import JsonResponseDisplay from './components/JsonResponseDisplay';
import Loader from './components/Loader';
import { generateVideoPromptJson } from './services/geminiService';
import type { VideoPrompt } from './types';

const App: React.FC = () => {
  const [description, setDescription] = useState<string>('');
  const [generatedJson, setGeneratedJson] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGeneratePrompt = useCallback(async () => {
    if (!description.trim()) {
      setError('Please enter a description for your video.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setGeneratedJson('');

    try {
      const promptJson: VideoPrompt = await generateVideoPromptJson(description);
      setGeneratedJson(JSON.stringify(promptJson, null, 2));
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred. Please check the console.');
    } finally {
      setIsLoading(false);
    }
  }, [description]);

  return (
    <div className="min-h-screen bg-white font-sans text-black flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <Header />
        <main className="mt-8">
          <PromptForm
            description={description}
            setDescription={setDescription}
            onSubmit={handleGeneratePrompt}
            isLoading={isLoading}
          />

          <div className="mt-8 min-h-[300px] w-full">
            {isLoading && <Loader />}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            {generatedJson && !isLoading && <JsonResponseDisplay jsonString={generatedJson} />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;