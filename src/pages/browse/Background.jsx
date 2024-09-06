import React, { useEffect, useState } from 'react';

const Background = ({ mov }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const base = `https://image.tmdb.org/t/p/`;
  const lowRes = `w92`; // Low-resolution image for the placeholder
  const highRes = `w780`; // Higher resolution for larger screens
  const posterRes = `w342`; // Poster size for small screens

  const currentMovie = mov[currentIndex]; // Get the current movie object
  const { title, overview, backdrop_path, poster_path, release_date, vote_average } = currentMovie;

  // Image preloading for smoother transitions
  useEffect(() => {
    const img = new Image();
    img.src = window.innerWidth < 640 ? `${base}${posterRes}${poster_path}` : `${base}${highRes}${backdrop_path}`;
    img.onload = () => setIsLoading(false);

    // Auto-switch to next image every 10 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % mov.length);
      setIsLoading(true);
    }, 10000);

    return () => clearInterval(interval);
  }, [currentIndex, backdrop_path, poster_path]);

  // Function to go to the next slide
  const handleNext = () => {
    setIsLoading(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % mov.length);
  };

  // Function to go to the previous slide
  const handlePrevious = () => {
    setIsLoading(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + mov.length) % mov.length);
  };

  return (
    <>
      <div className="relative w-full h-[calc(100vh-64px)] overflow-hidden">
        {/* Low-resolution placeholder */}
        {isLoading && (
          <img
            className="absolute inset-0 w-full h-full object-cover blur-md filter brightness-50"
            src={
              window.innerWidth < 640
                ? `${base}${lowRes}${poster_path}`
                : `${base}${lowRes}${backdrop_path}`
            }
            alt="Movie Placeholder"
          />
        )}

        {/* High-resolution image */}
        <img
          className={`absolute inset-0 w-full h-full object-cover shadow-lg transition-opacity duration-1000 ease-in-out ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          src={
            window.innerWidth < 640
              ? `${base}${posterRes}${poster_path}`
              : `${base}${highRes}${backdrop_path}`
          }
          alt={title}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black z-10"></div>

        <div className="absolute bottom-12 left-8 right-8 z-20 w-auto max-w-screen-xl p-4 sm:p-6 bg-black bg-opacity-50 rounded-xl shadow-2xl transition-transform duration-700 ease-in-out transform hover:scale-105">
          {/* Title */}
          <h1 className="text-2xl sm:text-4xl font-extrabold mb-3 sm:mb-5 truncate tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-yellow-500">
            {title}
          </h1>

          {/* Description */}
          <p className="text-xs sm:text-sm md:text-base text-gray-200 line-clamp-2 sm:line-clamp-3 max-h-16 sm:max-h-24 overflow-hidden leading-tight sm:leading-relaxed mb-4 sm:mb-6">
            {overview}
          </p>

          {/* Release Date and Rating */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs sm:text-sm md:text-base text-gray-400 space-y-2 sm:space-y-0 mb-4 sm:mb-6">
            <p className="bg-gray-900 px-3 py-1 rounded-full bg-opacity-70">Release: {release_date}</p>
            <p className="bg-yellow-500 text-black font-bold px-3 py-1 rounded-full">Rating: {vote_average}/10</p>
          </div>

          {/* Navigation Buttons */}
          <div className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 flex items-center">
            <button
              onClick={handlePrevious}
              className="p-3 sm:p-4 bg-gray-900 bg-opacity-60 text-white rounded-full hover:bg-opacity-90 transition-all duration-300 ease-in-out transform hover:scale-110"
            >
              &lt;
            </button>
          </div>
          <div className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 flex items-center">
            <button
              onClick={handleNext}
              className="p-3 sm:p-4 bg-gray-900 bg-opacity-60 text-white rounded-full hover:bg-opacity-90 transition-all duration-300 ease-in-out transform hover:scale-110"
            >
              &gt;
            </button>
          </div>
        </div>



      </div>
    </>
  );
};

export default Background;
