import React, { useState } from 'react';
import useGetmovielist from '../../hooks/useGetmovielist';

const List = ({ mov }) => {
  const { movies, error } = useGetmovielist(mov.key);
  
  const [loadedImages, setLoadedImages] = useState({});

  const handleImageLoad = (id) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <h1 className="text-4xl font-bold text-red-500">Error: {error.message}</h1>
      </div>
    );
  }
  if (!movies) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <h1 className="text-3xl font-semibold text-white">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-800">
      <h1 className="text-3xl font-bold text-white mb-4">{mov.head}</h1>
      <div className="relative overflow-x-auto">
        <div className="flex space-x-4 animate-scroll">
          {movies.map((movie) => (
            <div key={movie.id} className="w-48 flex-shrink-0 relative">
              {/* Low-Resolution Placeholder */}
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                className={`w-full h-72 object-cover rounded-lg shadow-lg ${loadedImages[movie.id] ? 'opacity-100' : 'opacity-50'}`}
                onLoad={() => handleImageLoad(movie.id)}
              />
              {/* Full-Resolution Image */}
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className={`absolute inset-0 w-full h-full object-cover rounded-lg shadow-lg transition-opacity duration-300 ${loadedImages[movie.id] ? 'opacity-100' : 'opacity-0'}`}
              />
              {/* Movie Title */}
              <h2 className="mt-2 text-lg font-semibold text-white truncate">{movie.title}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default List;
