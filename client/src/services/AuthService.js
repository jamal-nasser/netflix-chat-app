import axios from "axios";
const { REACT_APP_BASE_URL } = process.env;

class AuthService {
  constructor() {
    this.service = axios.create({
      baseURL: REACT_APP_BASE_URL,
      withCredentials: true,
    });
  }

  signup = (email, password) =>
    this.service
      .post("/signup", { email, password})
      .then((response) => response.data);

  login = (email, password) =>
    this.service
      .post("/login", { email, password })
      .then((response) => response.data);

  logout = () =>
    this.service.post("/logout", {}).then((response) => response.data);

  isLoggedIn = () =>
    this.service.get("/loggedin").then((response) => response.data);
}

export default AuthService;
