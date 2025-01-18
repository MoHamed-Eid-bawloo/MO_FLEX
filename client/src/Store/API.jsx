import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const tembContext = createContext();

export const TembProvider = ({ children }) => {
  const baseApi = "https://api.themoviedb.org/3";
  const keyApi =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDJiMDRlMmJmNWI5ZjYzMzJhOGVkOGFjZGUxZjM0MCIsIm5iZiI6MTcxODQ1OTM1Ny43NDEsInN1YiI6IjY2NmQ5YmRkMmEzMzIwODliYjk5YzZmNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gOpydioL_OR3ri52sndayWGGMzN9-__8QSkMyOgVqaU";
  const [userData,setUserData ] =useState(()=>JSON.parse(localStorage.getItem("UserData")))
   const token = localStorage.getItem("noToken");
  const [isLogin, setIsLogin] = useState(true);
  const apiClient = axios.create({
    baseURL: baseApi,
    headers: {
      Authorization: `Bearer ${keyApi}`,
    },
  });
  const tembApi = {
    getUpCommingMovies: async (params) => {
      try {
        const { data } = await apiClient.get("/movie/upcoming", { params });
        return data;
      } catch (error) {
        console.error("Error fetching upcoming movies:", error);
        return null;
      }
    },
  
    getPopularMovies: async () => {
      try {
        const { data } = await apiClient.get("/movie/popular");
        return data;
      } catch (error) {
        console.error("Error fetching popular movies:", error);
        return null;
      }
    },
  
    getActors: async () => {
      try {
        const { data } = await apiClient.get("/person/popular");
        return data;
      } catch (error) {
        console.error("Error fetching actors:", error);
        return null;
      }
    },
  
    getSearchedActor: async (searchTerm) => {
      try {
        const { data } = await apiClient.get(`/search/person?query=${searchTerm}`);
        return data;
      } catch (error) {
        console.error("Error searching actor:", error);
        return null;
      }
    },
  
    getSearchedMovie: async (movieSearchTerm) => {
      try {
        const { data } = await apiClient.get(`/search/movie?query=${movieSearchTerm}`);
        return data;
      } catch (error) {
        console.error("Error searching movie:", error);
        return null;
      }
    },
  
    getGenreList: async () => {
      try {
        const { data } = await apiClient.get("/genre/movie/list");
        return data;
      } catch (error) {
        console.error("Error fetching genres:", error);
        return null;
      }
    },
  
    getMovieByGenre: async (genreId) => {
      try {
        const { data } = await apiClient.get(
          `/discover/movie?include_adult=false&include_video=true&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreId}`
        );
        return data;
      } catch (error) {
        console.error("Error fetching movie by genre:", error);
        return null;
      }
    },
  
    getMovieDetail: async (movieId) => {
      try {
        const { data } = await apiClient.get(`/movie/${movieId}?language=en-US`);
        return data;
      } catch (error) {
        console.error("Error fetching movie detail:", error);
        return null;
      }
    },
  
    getMovieCast: async (movieId) => {
      try {
        const { data } = await apiClient.get(`/movie/${movieId}/credits`);
        return data;
      } catch (error) {
        console.error("Error fetching movie cast:", error);
        return null;
      }
    },
  
    getMovieRecommendations: async (movieId) => {
      try {
        const { data } = await apiClient.get(`/movie/${movieId}/recommendations`);
        return data;
      } catch (error) {
        console.error("Error fetching movie recommendations:", error);
        return null;
      }
    },
    getMovieTrailer: async (movieId) => {
      try {
        const { data } = await apiClient.get(`/movie/${movieId}/videos`);
        return data;
      } catch (error) {
        console.error("Error fetching movie trailer:", error);
        return null;
      }
    },
  
    getActorDetail: async (actorId) => {
      try {
        const { data } = await apiClient.get(`/person/${actorId}`);
        return data;
      } catch (error) {
        console.error("Error fetching actor detail:", error);
        return null;
      }
    },
  
    getActorCredits: async (actorId) => {
      try {
        const { data } = await apiClient.get(`/person/${actorId}/movie_credits`);
        return data;
      } catch (error) {
        console.error("Error fetching actor credits:", error);
        return null;
      }
    }
  };
  

  return (
    <tembContext.Provider
      value={{
        tembApi,
        userData,
        token,
        isLogin,
        setIsLogin,
        setUserData
      }}
    >
      {children}
    </tembContext.Provider>
  );
};

export const useTmdbAPI = () => {
  return useContext(tembContext);
};
