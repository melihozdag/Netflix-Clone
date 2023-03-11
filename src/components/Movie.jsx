import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { db } from "../firebase";
import { updateDoc, doc, arrayUnion } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { Link } from "react-router-dom";
import { setSelectedMovie } from "../features/movieSlice";

function Movie({ movie }) {
  const user = useSelector(selectUser);
  const [liked, setLiked] = useState(false);
  const dispatch = useDispatch();

  const userID = doc(db, "users", `${user?.email}`);

  const saveShow = async () => {
    if (user?.email) {
      setLiked(true);
      await updateDoc(userID, {
        savedShow: arrayUnion({
          id: movie.id,
          title: movie.title,
          img: movie.backdrop_path,
        }),
      });
    } else {
      alert("Please log in to save movie");
    }
  };

  const handleClick = () => {
    dispatch(setSelectedMovie(movie));
  };

  return (
    <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2">
      <div onClick={handleClick}>
        <img
          className="object-contain w-full h-[150px] block"
          src={`https://image.tmdb.org/t/p/w500/${
            movie?.backdrop_path || movie?.poster_path
          }`}
          alt={movie?.title}
        />
        <div className="absolute top-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white group">
          <Link to={`/${movie.id}`}>
            <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center cursor-pointer">
              {movie?.title}
            </p>
          </Link>
        </div>
      </div>
      <p onClick={saveShow} className="group-hover:opacity-100 opacity-0">
        {liked ? (
          <FaHeart className="absolute top-4 left-4 text-red-600 " />
        ) : (
          <FaRegHeart className="absolute top-4 left-4 text-gray-300" />
        )}
      </p>
    </div>
  );
}

export default Movie;
