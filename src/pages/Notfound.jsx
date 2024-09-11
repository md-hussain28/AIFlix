import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css"; // For custom animations

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white relative overflow-hidden">
      {/* Starry sky */}
      <div className="absolute inset-0 z-0 stars"></div>

      {/* Film reel animation */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-film-strip"></div>

      {/* 404 Content */}
      <div className="text-center z-10">
        <h1 className="text-9xl font-bold glitch-text">
          404
        </h1>
        <h2 className="text-3xl mt-4 mb-6">
          Oops! The movie you're looking for is lost in the reels.
        </h2>
        <p className="text-lg mb-12">
          The page you requested does not exist. Let's help you find your next blockbuster!
        </p>
        <Link to="/" className="px-8 py-4 bg-yellow-500 text-black rounded-full text-lg font-bold animate-pulse hover:bg-yellow-600 transition duration-300">
          Find Movies
        </Link>
      </div>

      {/* More glitch animations for the immersive effect */}
      <div className="absolute top-0 left-0 w-full h-full glitch-effect z-20"></div>
    </div>
  );
};

export default NotFound;
