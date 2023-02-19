import axios from "axios";
import API from "./config/api";

export default axios.create({
  baseURL: API.url,
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer `,
  },
});
