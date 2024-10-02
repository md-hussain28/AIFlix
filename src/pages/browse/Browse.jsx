import React from 'react'
import useGetmovielist from '../../hooks/useGetmovielist'
import Background from './Background';
import List from './List';
import LoadingPage from '../LoadingPage';
import { FaSearchengin } from 'react-icons/fa';
import { GiSpinningBlades } from "react-icons/gi";

import { Link } from 'react-router-dom';

const Browse = () => {
  const { movies, error } = useGetmovielist("now_playing");
  const type = [{ head: "Top Rated", key: "top_rated" },
  { head: "Now Playing", key: "now_playing" },
  { head: "Popular", key: "popular" },
  { head: "Upcoming", key: "upcoming" }
  ]

  if (error) {
    return <div className="text-center text-2xl font-bold text-red-600">Error: {error.message}</div>;
  }
  if (!movies) {
    return <LoadingPage />
  }


  return (
    <>
      <Background mov={movies} />
      <h1 className='h-32 p-6 bg-gradient-to-b from-black via-slate-900 to-gray-800 font-serif
      text-cyan-400 text-4xl md:text-6xl text-center'>
        Explore Movies
      </h1>

      <div className='bg-gradient-to-r from-gray-800 via-gray-900 to-black p-6 flex items-center justify-center'>
       
        <Link
          to='/search'
          className='flex items-center p-6 bg-gray-900 rounded-lg shadow-lg border border-gray-700 transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:bg-gray-800'
        >
          <GiSpinningBlades className='text-5xl text-purple-500 mr-4 animate-spin' />
          <FaSearchengin className='text-5xl text-purple-500 mr-4 animate-spin-slow'/>
          <h1 className='text-3xl font-extrabold text-white'>
            CLICK!!!.... Find Your Next Favorite Movie Based on Your Mood
          </h1>
        </Link>
      </div>

      {
        type.map((i, key) => {
          return <List key={key} mov={i} />
        })
      }
    </>
  )
}

export default Browse
