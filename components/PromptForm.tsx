import React from 'react';

interface PromptFormProps {
  description: string;
  setDescription: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const PromptForm: React.FC<PromptFormProps> = ({ description, setDescription, onSubmit, isLoading }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label htmlFor="description" className="block text-md font-medium text-gray-700">
        Describe your video idea (in English or Khmer)
      </label>
      <textarea
        id="description"
        rows={6}
        className="block w-full bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-black focus:border-black text-black p-4 transition duration-150 ease-in-out placeholder-gray-400"
        placeholder="e.g., 'a cinematic shot of a robot meditating in a futuristic Angkor Wat' or 'មនុស្សយន្តកំពុងតាំងសមាធិនៅអង្គរវត្តនាពេលអនាគត'"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading || !description.trim()}
        className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black focus:ring-offset-white disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300"
      >
        {isLoading ? 'Generating...' : 'Generate JSON Prompt'}
      </button>
    </form>
  );
};

export default PromptForm;