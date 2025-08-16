import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:5001",
  baseURL: 'http://3.25.239.91', // live
  headers: { "Content-Type": "application/json" },
});

export default axiosInstance;


// Changes for Final Workflow Run Test Push