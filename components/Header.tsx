import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 pb-2">
        Felix Veo Prompt Generator
      </h1>
      <p className="mt-2 text-lg text-gray-600">
        Craft detailed JSON prompts for video generation, with Khmer language support.
      </p>
    </header>
  );
};

export default Header;