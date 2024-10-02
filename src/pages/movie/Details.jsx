import React from 'react'
import { useParams } from 'react-router-dom'
import MovieDetail from './MovieDetail';
import SimilarMovies from './SimilarMovies';
import { Link } from 'react-router-dom';

const Details = () => {
  const { movieId } = useParams();

  
  return (
    <div className='w-full min-h-screen bg-neutral-900'>
      <Link to="/browse" className='bg-transparent  z-40'>
        <button
          className="fixed top-14  left-8 z-50 bg-gray-900 text-center w-36 rounded-xl h-10 text-white text-lg font-semibold group"
          type="button">
          <div
            className="bg-gray-700 rounded-lg h-8 w-1/5 flex items-center justify-center absolute left-1 top-[3px] group-hover:w-[136px] z-10 duration-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1024 1024"
              height="20px"
              width="20px"
            >
              <path
                d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                fill="#ffffff"
              ></path>
              <path
                d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 1 1 1 45.312 45.312L237.248 512z"
                fill="#ffffff"
              ></path>
            </svg>
          </div>
          <p className="translate-x-2 text-white">Home</p>
        </button>
      </Link>
      <MovieDetail id={movieId} />
      <SimilarMovies id={movieId} />
    </div>
  )
}

export default Details
