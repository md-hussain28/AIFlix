import React from 'react'
import useNowplaying from '../../hooks/useNowplaying'
import BackgroundVideo from './BackgroundVideo';

const MovieCard = ( movie,key ) => {
  //console.log("Moviecar ->",movie)
  return (
    <div key={key} className="bg-gray-800 text-white rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out">
    <img
      className="w-full h-72 object-cover"
      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
      alt={movie.title}
    />
    <div className="p-6">
      <h3 className="text-xl font-bold mb-2 truncate">{movie.title}</h3>
      <p className="text-gray-400 text-sm mb-2">{movie.release_date}</p>
      <p className="text-gray-300 text-sm line-clamp-2">{movie.overview}</p>
      <div className="flex justify-between items-center mt-4">
        <span className="text-yellow-400 font-semibold">⭐ {movie.vote_average}</span>
        <span className="text-gray-500">{movie.vote_count} votes</span>
      </div>
    </div>
  </div>
  );
};


const Browse = () => {
  const { movies, error } = useNowplaying();



  if(!movies){
     return <div className='min-h-screen bg-zinc-600'> <h1 className='text-6xl text-black'>Loading</h1></div>
  }
  if (error) {
    return <div className="text-center text-2xl font-bold text-red-600">Error: {error.message}</div>;
  }

  return (
    <><BackgroundVideo mov={movies}/>
    <div className="bg-cyan-300 min-h-screen p-10">
      
    <h1 className="text-center text-3xl font-bold mb-10 text-gray-800">
      Now Playing
    </h1>
    <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {movies &&
        movies.map((movie,key) => (
          MovieCard(movie,key)
          
        ))}
    </div>
  </div>
  </>
  )
}

export default Browse
