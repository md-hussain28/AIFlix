import React, { useEffect, useState } from 'react';
import useGetvideoid from '../../hooks/useGetvideoid';
import YouTube from 'react-youtube';
const BackgroundVideo = ({ mov }) => {
  const [vid, setVid] = useState(null);

  const id = useGetvideoid(mov[0].id);

  useEffect(() => {
    if (id) {
      const filteredVid = id.find((video) => video.type === "Trailer" && video.site === "YouTube");
      if (filteredVid) {
        setVid(filteredVid.key); // Assuming `key` is the YouTube video ID
      }
    }
  }, [id]);

  return (
    <div className='relative w-fit h-fit overflow-hidden'>
    {vid && (
       <iframe
       title="Background Video"
       width="100%"
       height="100%"
       src={`https://www.youtube.com/embed/${vid}?autoplay=1&mute=1&loop=1&playlist=${vid}&controls=0&showinfo=0&modestbranding=1&fs=0`}
       frameBorder="0"
       allow="autoplay; fullscreen"
       allowFullScreen
       className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
     />
     
    )}
  </div>
  );
}

export default BackgroundVideo;
