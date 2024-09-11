import React from 'react'
import useGetmovielist from '../../hooks/useGetmovielist'
import Background from './Background';
import List from './List';
import LoadingPage from '../LoadingPage';


const Browse = () => {
  const { movies, error } = useGetmovielist("now_playing");
  const type=[{head:"Top Rated",key:"top_rated"},
    {head:"Now Playing",key:"now_playing"},
    {head:"Popular",key:"popular"},
    {head:"Upcoming",key:"upcoming"}
  ]
  
  if (error) {
    return <div className="text-center text-2xl font-bold text-red-600">Error: {error.message}</div>;
  }
  if(!movies){
     return <LoadingPage/>
  }
 

  return (
    <>
     <Background mov={movies}/>
     <h1 className='bg-black font-serif text-cyan-400 text-4xl text-center'>Explore Movies</h1>
     {
      type.map((i,key)=>{
        return <List key={key} mov={i}/>
      })
     }
  </>
  )
}

export default Browse
