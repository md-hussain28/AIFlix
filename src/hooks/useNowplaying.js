import { useState,useEffect} from "react";
import { options } from "../assets/constants";
const useNowplaying = () => {
    const [movies, setMovies] = useState(null);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchNowPlaying = async () => {
        try {
          const response = await fetch('https://api.themoviedb.org/3/movie/now_playing?page=1', options);
          const data = await response.json();
          setMovies(data.results);
        } catch (err) {
          setError('Failed to fetch movies');
          console.error(err);
        }
      };
  
      fetchNowPlaying();
    }, []);
  
    return { movies, error };
  };
  
  export default useNowplaying;
  