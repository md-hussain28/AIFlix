export const LOGO="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png";
export  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_ACCESS_TOKEN}`,  // API key from env
    },
  };