import React, { useState, useEffect } from 'react';
import './WatchList.css';
import Nav from '../Nav/Nav';
import WatchListService from '../../services/WatchListService';

const WatchList = (props) => {

  const [details, setDetails] = useState([]);
  const [removeMessage, setRemoveMessage] = useState('');
  
  useEffect(() => {

    const service = new WatchListService();

    service
      .showWatchList(props.setUser._id)
      .then((responseFromApi) => {
        setDetails(responseFromApi)
      })
      .catch((error) => {
        console.error(error);
      });
  }, [props.setUser._id])

  const handleRemoveFromWatchList = (movieId) => {
    console.log(movieId)

    const service = new WatchListService();


    service
      .deleteWatchList(movieId)
      .then((response) => {
        console.log(response)
        setRemoveMessage('Movie has been removed!')
      })
      .catch((err) => console.error(err));
  }

  const truncate = (string, n) => {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }


  return (
    <div className="myWatchList">
    <Nav />
     <h1 className="myWatchList-heading">My Watch List</h1>
      <div>
        {removeMessage && <p>{removeMessage}</p>}
      </div>
      
      {details.length > 0 && details[0].movies.map((item) => {
        return (
          <div key={item._id} className="myWatchScreen-screen" style={{
            backgroundSize: 'cover',
            backgroundImage: `url("https://image.tmdb.org/t/p/original/${item.backdrop_path} ")`,
            backgroundPosition: "center center"
          }}>
           
            <div className="myWatchScreen-content">
              <h1 className="myWatchScreen-title">{item.title || item.name || item.original_name}</h1>

              <div>
                <button className="myWatchScreen-button" onClick={() => handleRemoveFromWatchList(item._id)} >Remove from My List</button>
              </div>

              <h1 className="myWatchScreen-description">
                {truncate(`${item.overview}`, 150)}
              </h1>
             
            </div>
            <div className="myWatchList--fadeBottom" />
          </div>

        )
      })}

      
    </div>
  )
}

export default WatchList;





