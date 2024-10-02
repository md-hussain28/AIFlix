import React, { useEffect, useState } from 'react';
import { options } from '../../assets/constants';
import './MovieDetail.css'; 
import LoadingPage from '../LoadingPage';

const MovieDetail = ({ id }) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   
    const getData = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
          options
        );
        const data = await res.json();
        setMovie(data);
      } catch (error) {
        console.log('Error in Movie Details Loading:', error);
        setMovie('Movie Details Cannot be Fetched');
      }
      setLoading(false);
    };

    getData();
  }, [id]);

  if (loading) return <LoadingPage />;
  if (typeof movie === 'string') return <div className="error-message">{movie}</div>;

  return (
    <div className="h-fit bg-gradient-to-b from-gray-900 via-purple-900 to-black text-white p-6 lg:p-10 animate-fadeIn">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Movie Poster */}
        <div className="flex justify-center lg:justify-start">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full max-w-xs sm:max-w-sm lg:max-w-md rounded-lg shadow-lg hover:scale-105 transform transition-all duration-500 ease-in-out animate-slideUp"
          />
        </div>

        {/* Movie Details */}
        <div className="space-y-6 lg:space-y-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 transition duration-500 ease-in-out hover:text-yellow-300">
            {movie.title}
          </h1>
          <p className="italic text-sm md:text-base text-gray-300 mb-4">
            {movie.tagline}
          </p>

          {/* Overview */}
          <div className="relative bg-gray-800 rounded-lg p-6 mb-6 shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl">
            <h2 className="text-2xl lg:text-3xl font-semibold mb-4 text-yellow-400">
              Overview
            </h2>
            <p className="text-base lg:text-lg text-gray-200">
              {movie.overview}
            </p>
          </div>

          {/* Additional Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-gray-300">
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg hover:bg-purple-800 transition duration-500">
              <h3 className="font-semibold text-yellow-300">Release Date</h3>
              <p>{movie.release_date}</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg hover:bg-purple-800 transition duration-500">
              <h3 className="font-semibold text-yellow-300">Genres</h3>
              <p>{movie.genres.map((genre) => genre.name).join(', ')}</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg hover:bg-purple-800 transition duration-500">
              <h3 className="font-semibold text-yellow-300">Runtime</h3>
              <p>{movie.runtime} min</p>
            </div>
          </div>

     
          {/* Official Website Link */}
          {movie.homepage && (
            <a
              href={movie.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-xl font-semibold text-yellow-400 hover:text-white transition transform hover:scale-110 duration-500 ease-in-out border-b-2 border-yellow-400 hover:border-white"
            >
              Visit Official Website
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
