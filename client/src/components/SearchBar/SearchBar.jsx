import React, { useState } from 'react';
import './SearchBar.css';
import MovieSearchCard from '../MovieSearchCard/MovieSearchCard';
import { Link } from "react-router-dom";


const { REACT_APP_API_KEY} = process.env;

const SearchBar = () => {

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleChange = (event) => {
    event.preventDefault();
    setQuery(event.target.value)
    
    fetch(`https://api.themoviedb.org/3/search/multi?api_key=${REACT_APP_API_KEY}&language=en-US&page=1&include_adult=false&query=${event.target.value}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.errors) {
          setResults(data.results);
        } else {
          setResults([]);
        }
      });
      
  }

  return (
    <div className="searchBar-screen">
     
      <h1>Search for your favorite movie, series or documentary..</h1>
      <Link to="/watchlist/:id">
        <button className="myWatchList-button">
          My Watch List
        </button>
      </Link>
      <div className="searchBar-input">
        <input  type="text" placeholder="Search all..." value={query} onChange={handleChange} />
      </div>
      {results.length > 0 && (
        <div>
          {results.map((movie) => {
            return (<div key={movie.id}>
              <MovieSearchCard movie={movie} />
            </div>)
          })}
        </div>
      )}
    </div>
  )
}

export default SearchBar;
