import React from 'react'
import { useParams } from 'react-router-dom'
import MovieDetail from './MovieDetail';
import SimilarMovies from './SimilarMovies';


const Details = () => {
    const {movieId}=useParams();
  return (
    <div className='w-full min-h-screen bg-neutral-900'>
     <MovieDetail id={movieId}/>
     <SimilarMovies id={movieId}/>
    </div>
  )
}

export default Details
