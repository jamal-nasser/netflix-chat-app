const { REACT_APP_API_KEY } = process.env;
// const API_KEY = 'dee3f768f0c88024af8a9317527d96f1'

const requests = {

  fetchTrending: `/trending/all/week?api_key=${REACT_APP_API_KEY}&language=en-US`, fetchNetflixOriginals: `/discover/tv?api_key=${REACT_APP_API_KEY}&with_networks=213`,
  fetchTopRated: `/movie/top_rated?api_key=${REACT_APP_API_KEY}&language=en-US`,
  fetchActionMovies: `/discover/movie?api_key=${REACT_APP_API_KEY}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${REACT_APP_API_KEY}&with_genres=35`, fetchHorrorMovies: `/discover/movie?api_key=${REACT_APP_API_KEY}&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${REACT_APP_API_KEY}&with_genres=10749`, fetchDocumentaries: `/discover/movie?api_key=${REACT_APP_API_KEY}&with_genres=99`,
}

export default requests;



