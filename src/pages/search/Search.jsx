// src/components/SearchMovie.jsx

import React, { useEffect, useState } from 'react';
import useGemini from '../../hooks/useGemini.jsx';
import { Link } from 'react-router-dom'; // For navigation
import { options } from '../../assets/constants.js';

const getMovie = async (id) => {
  try {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?include_adult=false`, options);
    if (!res.ok) throw new Error('Failed to fetch movie');
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error in fetching movie for query", error);
    return null;
  }
}

const Search = () => {
  const [val, setVal] = useState("");
  const [prompt, setPrompt] = useState('popular');
  const { result, error, loading } = useGemini(prompt);
  const [movies, setMovies] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPrompt(val);
    setVal("");
  };

  useEffect(() => {
    const fetchMovies = async () => {
      if (result && Array.isArray(result)) {
        const list = await Promise.all(result.map(async (id) => {
          const temp = await getMovie(id);
          return temp;
        }));
        setMovies(list.filter(movie => movie)); // Filter out any null results
      }
    };

    fetchMovies();
  }, [result]);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-900 text-white">
      {/* Form Section */}
      <div className="flex-1 p-6 bg-gray-800 rounded-lg shadow-lg lg:w-1/3 lg:sticky lg:top-0">
        <h1 className="text-3xl font-bold mb-4 text-center">Find Your Next Favorite Movie</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={val}
            onChange={(e) => setVal(e.target.value)}
            placeholder="Describe your mood or genre preference..."
            rows="4"
            className="w-full p-3 rounded-lg border border-gray-700 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
          />
          <button
            type="submit"
            className="w-full p-3 bg-cyan-500 text-white font-semibold rounded-lg shadow-lg hover:bg-cyan-600 transition-all"
          >
            Submit
          </button>
        </form>
      </div>
      
      {/* Movies List Section */}
      <div className="flex-1 p-6 lg:w-2/3">
        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {movies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {movies.map((movie) => (
              <div key={movie.id} className="bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  loading="lazy"
                  className="w-full h-60 object-cover rounded-t-lg mb-4"
                />
                <h2 className="text-xl font-bold mb-2">{movie.title}</h2>
                <p className="text-gray-400">{movie.overview.length > 100 ? movie.overview.substring(0, 100) + '...' : movie.overview}</p>
                <div className="mt-4 flex justify-end">
                  <Link to={`/browse/${movie.id}`} className="text-cyan-500 hover:underline">Read More</Link>
                </div>
              </div>
            ))}
          </div>
        ) : !loading && !error ? (
          <p className="text-center">No movies found. Try another prompt!</p>
        ) : null}
      </div>
    </div>
  );
};

export default Search;
