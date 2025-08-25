import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:5001",
  baseURL: 'http://54.252.195.240:5001', // live
  headers: { "Content-Type": "application/json" },
});

export default axiosInstance;


// Changes for Final Workflow Run Test 