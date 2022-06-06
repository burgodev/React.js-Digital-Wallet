import axios from "axios";

const apiUrl = `https://api.countrystatecity.in/v1/`

const apiCSC = axios.create({
  baseURL: apiUrl,
  headers: {
    "X-CSCAPI-KEY": "WmkyZzdPWlhNTTB4dkdvRzl1Y0Z4UVZxa2FXdGs0WlNhakg1bUR3WQ=="
  },
});

export default apiCSC;

