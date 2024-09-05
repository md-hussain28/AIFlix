import { useState, useEffect } from "react";
import { options } from "../assets/constants";

const useGetVideoId = (vid) => {
  const [id, setId] = useState(null);
  console.log("Usegetvideo->",vid);
  
  useEffect(() => {
    const fetchId = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${vid}/videos?`,
          options
        );
        const data = await res.json();
       
        setId(data.results);
        console.log(data.results);
        
      } catch (err) {
        console.error("UseGetVideoId: Fetch error", err);
      }
    };

    if (vid) {
      fetchId();
    }
  }, [vid]); 
  //const temp=id.filter((i)=>i.type=="Trailer")
  return id;
};

export default useGetVideoId;

