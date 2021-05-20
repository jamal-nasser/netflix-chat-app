import React, { useState, useEffect } from 'react';
import './Row.css';
import axios from '../axios/axios';


const Row = ({ title, fetchUrl, isLargeRow = false }) => {

  const [movies, setMovies] = useState([]);


  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }

    fetchData();
  }, [fetchUrl]);

  
  return (
    <div className="row">
      
      <h2 style={{color: "black"}}>{title}</h2>

      <div className="row-posters">

        {
          movies.map((movie, id) => {

            return ((isLargeRow && movie.poster_path) ||
              (!isLargeRow && movie.backdrop_path)) && (

                <img className={`row-poster ${isLargeRow && "row-posterLarge"}`}
                  key={movie.id}
                  src={`https://image.tmdb.org/t/p/original/${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name} />


              )
          })


        }
      </div>
    </div>
  )
}

export default Row;
