import React from 'react';
import './WatchScreen.css';
import Banner from '../Banner/Banner';
import Row from '../Row/Row';
import requests from '../requests/requests';
import { Link } from 'react-router-dom';
const WatchScreen = () => {

  return (
    <div className="watchScreen">
 

      <Banner />

      <div>
        <Link to="/search">
          <button className="watchScreen-searchButton">Search all...</button>
        </Link>
     </div>



      <Row
        title='NETFLIX ORIGINALS'
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
      />
      <Row title='TOP RATED' fetchUrl={requests.fetchTrending} />
      <Row title='ACTION MOVIES' fetchUrl={requests.fetchActionMovies} />
      <Row title='COMEDY MOVIES' fetchUrl={requests.fetchComedyMovies} />
      <Row title='HORROR MOVIES' fetchUrl={requests.fetchHorrorMovies} />
      <Row title='ROMANCE MOVIES' fetchUrl={requests.fetchRomanceMovies} />
      <Row title='DOCUMENTARIES' fetchUrl={requests.fetchDocumentaries} />

    </div>
  )
}

export default WatchScreen;
