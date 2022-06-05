import axios from "axios"
export const axiosInstance = axios.create({
  // baseURL: "http://localhost:8000/api",
  baseURL: "https://careerhouse.herokuapp.com/api/",
})
export const PF = "https://careerhouse.herokuapp.com"
// export const PF = "http://localhost:8000"
 
