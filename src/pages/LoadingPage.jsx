import React from 'react';

const LoadingPage = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      {/* Loader container */}
      <div className="flex flex-col items-center space-y-4">
        {/* Circular spinning loader */}
        <div className="w-24 h-24 border-4 border-t-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
        
        {/* Loading text */}
        <div className="text-white text-2xl font-semibold animate-pulse">
          Loading 
        </div>
        
        {/* Cinematic sliding bar */}
        <div className="h-1 w-56 bg-yellow-500 animate-pulse"></div>
      </div>
    </div>
  );
};

export default LoadingPage;
