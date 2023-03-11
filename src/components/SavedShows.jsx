import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";

const SavedShows = () => {
  const user = useSelector(selectUser);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getUserData = async () => {
      const docRef = doc(db, "users", `${user?.email}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data().savedShow;
        setMovies(data);
      } else {
        console.log("No such document!");
      }
    };

    getUserData();
  }, [user]);

  const deleteMovie = async (movieId) => {
    const docRef = doc(db, "users", `${user?.email}`);
    await updateDoc(docRef, {
      savedShow: movies.filter((movie) => movie.id !== movieId),
    });
    setMovies(movies.filter((movie) => movie.id !== movieId));
  };

  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };
  return (
    <div>
      <h1 className="text-white font-bold m-5 text-xl">Saved Movies / Shows</h1>
      <div className="relative flex items-center group">
        <MdChevronLeft
          onClick={slideLeft}
          className="bg-white text-black rounded-full absolute left-0 opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={40}
        />
        <div
          id={"slider"}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
        >
          {movies?.map((movie) => (
            <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2">
              <img
                key={movie.id}
                className="w-full h-auto block"
                src={`https://image.tmdb.org/t/p/w500/${movie?.img}`}
                alt={movie?.title}
              />
              <div className="absolute top-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white ">
                <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
                  {movie?.title}
                </p>
              </div>
              <AiFillDelete
                onClick={() => deleteMovie(movie.id)}
                className="absolute text-3xl top-0 right-0 m-2 text-red-400 font-bold rounded-full p-1 hidden group-hover:block"
              >
                Delete
              </AiFillDelete>
            </div>
          ))}
        </div>
        <MdChevronRight
          onClick={slideRight}
          className="bg-white text-black rounded-full absolute right-0 opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={40}
        />
      </div>
    </div>
  );
};

export default SavedShows;
