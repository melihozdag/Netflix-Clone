import { Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Account from "./pages/Account";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { login, logout } from "./features/userSlice";
import Signup from "./pages/Signup";
import MovieVideo from "./pages/MovieVideo";
import NotFound from "./pages/NotFound";
import { selectSelectedMovie } from "./features/movieSlice";

function App() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const movie = useSelector(selectSelectedMovie)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        dispatch(login(userAuth));
      } else {
        dispatch(logout());
      }
    });
    return unsubscribe;
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      {!user ? (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Navigate replace to="/" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/account" element={<Account />} />
          <Route path={`/${movie?.id}`} element={<MovieVideo />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate replace to="/404" />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
