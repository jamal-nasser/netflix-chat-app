import React, { useState, useEffect } from 'react';
import './Banner.css';
import axios from '../axios/axios';
import requests from '../requests/requests';
import { Link } from 'react-router-dom';

const Banner = () => {

  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
        Math.floor(Math.random() * request.data.results.length - 1)
        ]
      )
      return request;
    }

    fetchData();
  }, []);


  const truncate = (string, n) => {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }

  return (
    <header className="banner" style={{
      backgroundSize: 'cover',
      backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
      backgroundPosition: "center center",
      backgroundRepeat: "no-repeat",
      backgroundAttachment: "fixed",
    }}>
      <div className="banner-contents">
        <h1 className="banner-title">{movie?.title || movie?.name || movie?.original_name}</h1>
        <div className="banner-buttons">
          
          <Link to="/watchlist">
            <button className="banner-button">Watch List</button>
          </Link>
        </div>
        <h1 className="banner-description">
          {truncate(`${movie?.overview}`, 150)}
        </h1>
        
      </div>
      <div className="banner--fadeBottom" />
    </header>
  )
}

export default Banner;
