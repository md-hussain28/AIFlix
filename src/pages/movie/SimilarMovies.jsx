import React, { useEffect, useState } from 'react';
import { options } from '../../assets/constants'; // Adjust import based on your project structure
import { Link } from 'react-router-dom';

const SimilarMovies = ({ id }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=1`,
          options
        );
        if (!res.ok) throw new Error('Failed to fetch similar movies');
        const data = await res.json();
        setList(data.results);
      } catch (error) {
        console.log('Error in Loading Recommendations:', error);
        setError('Unable to load similar movies');
      }
      setLoading(false);
    };
    window.scrollTo(0, 0);
    getData();
  }, [id]);

  if (loading) return <div className="text-center text-white py-4">Loading...</div>;
  if (error) return <div className="text-center text-red-500 py-4">{error}</div>;

  return (
    <div className="bg-gray-900 p-6 lg:p-8 text-white min-h-screen">
      <h2 className="text-2xl lg:text-3xl font-bold mb-6 text-center">Movies You May Like</h2>
      {list.length === 0 ? (
        <p className="text-center text-gray-400">No similar movies found.</p>
      ) : (
      
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {list.map((movie) => (
              <Link key={movie.id} to={`/browse/${movie.id}`}>
            <div
              
              className="group px-6 py-4 bg-white/10 rounded-lg flex flex-col items-center justify-center gap-2 relative after:absolute after:h-full after:bg-[#511f7d] z-20 shadow-lg after:-z-20 after:w-full after:inset-0 after:rounded-lg transition-all duration-300 hover:transition-all hover:duration-300 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden cursor-pointer after:-translate-y-full after:hover:translate-y-0"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-44 h-64 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
              />
              <p className="font-semibold text-gray-200 tracking-wider line-clamp-1 group-hover:text-gray-700 text-xl">
                {movie.title}
              </p>
              <p className="text-gray-200 text-xs">
                {movie.release_date}
              </p>
              <div className="flex flex-row justify-between items-center w-full mt-2">
                <p className="text-[#010103] font-semibold group-hover:text-gray-300">
                  Buzz :{movie.popularity}
                </p>
                <button className="lg:inline-flex items-center gap-3 group-hover:bg-white/10 bg-[#5825b0] shadow-lg cursor-pointer py-2 px-4 text-sm font-semibold rounded-full">
                  View Details
                </button>
              </div>
            </div>
              </Link>
          ))}
        </div>
      
      )}
    </div>
  );
};

export default SimilarMovies;
