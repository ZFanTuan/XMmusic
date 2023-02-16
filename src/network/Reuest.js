import axios from "axios";

const request = axios.create({
  baseURL: 'https://zhu-cloud-music-api.vercel.app',
  timeout: 5000
})


export default request