import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectSelectedMovie } from "../features/movieSlice";
import YouTube from "react-youtube";
import SimilarMovies from "../components/SimilarMovies";

function MovieVideo() {
  const movieInfo = useSelector(selectSelectedMovie);
  const [movieKey, setMovieKey] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieInfo?.id}/videos?api_key=c576bb317a355e7ba0037ff521ee2065&language=en-US`
      )
      .then((response) => setMovieKey(response.data.results[0]?.key));
  }, [movieInfo?.id]);

  const opts = {
    height: "80%",
    width: "80%",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className="absolute mt-24 w-full h-full">
      {movieKey ? (
        <YouTube
          videoId={movieKey}
          opts={opts}
          className="w-full h-full flex justify-center"
        />
      ) : (<h1 className="text-white p-5">FİLMİN FRAGMANI BULUNMAMAKTADIR</h1>)}
      <SimilarMovies />
    </div>
  );
}

export default MovieVideo;
