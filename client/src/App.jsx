import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Layout from "./Pages/Layout";
import Home from "./Pages/Home";
import Sign_Up from "./Pages/SignUp";
import ProtectAuth, { ProtectLoginAuth } from "./MidleWare/ProtectAuth";
import Favs from "./Pages/Favs";
import AllUpCommingMovies from "./Pages/AllUpCommingMovies";
import Profile from "./Pages/Profile";
import AllPopularMovies from "./Pages/AllPopularMovies";
import Actors from "./Pages/Actors";
import AllActors from "./Pages/AllActors";
import SearchedActor from "./Pages/SearchedActor";
import SearchedMoviesIndex from "./Pages/SearchedMoviesIndex";
import SearchedMovies from "./Pages/SearchedMovies";
import GenereMovies from "./Pages/GenereMovies";
import ActorInfo from "./Pages/ActorInfo";
import MovieInfo from "./Pages/MovieInfo";
import Watchlist from "./Pages/WatchList";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Home />} />
          <Route element={<ProtectLoginAuth />}>
            <Route path="/log-in" element={<Login />} />
            <Route path="/sign-up" element={<Sign_Up />} />
          </Route>
            <Route path="/movieSearch" element={<SearchedMovies />} >
              <Route index element={<SearchedMoviesIndex />} />
              <Route path="/movieSearch/:genreId/:genreName" element={<GenereMovies />} />
            </Route>
            <Route path="/allUpComMovies" element={<AllUpCommingMovies />} />
            <Route path="/popularMovies" element={<AllPopularMovies />} />
            <Route path="/actors" element={<Actors />}>
            <Route index element={<AllActors />} />
            <Route path="/actors/:searchTerm" element={<SearchedActor />} />
            </Route>
          {/*Protected Auth */}
          <Route element={<ProtectAuth />}>
            <Route path="/favorites" element={<Favs />} />
            <Route path="/Watchlist" element={<Watchlist/>}/>
            <Route path="/profile" element={<Profile />} />
            <Route path="/actorInfo/:actorId" element={<ActorInfo />} />
            <Route path="/movieInfo/:movieId" element={<MovieInfo />} /> 
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}
