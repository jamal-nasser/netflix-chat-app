import React, {useState} from 'react';
import './MovieSearchCard.css';
import WatchListService from '../../services/WatchListService';

const MovieSearchCard = ({ movie }) => {

  const [addMessage, setAddMessage] = useState('');

  const handleAddToWatchList = (incomingMovie) => {

    const service = new WatchListService();

    
    service
      .createWatchList(incomingMovie)
      .then((createdWatchList) => {
        console.log(createdWatchList)
        setAddMessage('Movie has been added!')
      })
      .catch((err) => console.error(err)); 
  }

  const truncate = (string, n) => {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }
  
  return (
    <div className="movieSearchCard-screen" style={{
      backgroundSize: 'cover',
      backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path} ")`,
      backgroundPosition: "center center"
    }}>
      <div>
        {addMessage && <p>{addMessage}</p>}
      </div>
      <div className="movieSearchCard-content">
        <h1 className="movieSearchCard-title">{movie?.title || movie?.name || movie?.original_name}</h1>
        <div>
          <button className="movieSearchCard-button" onClick={() => handleAddToWatchList(movie)}>Add to My List</button>
       </div>
        <h1 className="movieSearchCard-description">
          {truncate(`${movie?.overview}`, 150)}
        </h1>
      </div>
      <div className="movieSearchCard--fadeBottom" />
    </div>
  )
}

export default MovieSearchCard;

