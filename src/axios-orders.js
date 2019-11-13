import axios from "axios";

const instance = axios.create({
  baseURL: "https://burger-time-2454e.firebaseio.com/"
});

export default instance;
