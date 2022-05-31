import axios from "axios"
export const axiosInstance = axios.create({
  // baseURL: "http://localhost:8000/api",
  baseURL: "https://aammal.herokuapp.com/api/",
})
export const PF = "https://aammal.herokuapp.com"
// export const PF = "http://localhost:8000"
// https://github.com/abdalhafeez/aammal

