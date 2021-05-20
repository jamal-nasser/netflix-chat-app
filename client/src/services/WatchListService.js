import axios from "axios";
const { REACT_APP_BASE_URL } = process.env;

class WatchListService {
  constructor() {
    this.service = axios.create({
      baseURL: REACT_APP_BASE_URL,
      withCredentials: true,
    });
  }

  createWatchList = (movies) =>
    this.service
      .post("/watchlist", { movies })
      .then((response) => response.data);

  showWatchList = (watchListId) =>
    this.service
      .get(`/watchlist/${watchListId}`)
      .then((response) => response.data);



  deleteWatchList = (watchListId) =>
    this.service
      .delete(`/watchlist/${watchListId}`)
      .then((response) => response.data);
}

export default WatchListService;
