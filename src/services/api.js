import axios from "axios";

const apiUrl = `${process.env.REACT_APP_BASE_URL}/api`

const api = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

const token = localStorage.getItem("token") || "";


if (token) {
  api.defaults.headers.authorization = token;
}

export default api;

