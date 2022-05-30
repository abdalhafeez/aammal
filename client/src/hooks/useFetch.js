import { useState, useEffect } from "react"
import { axiosInstance } from "../config/axiosInstance"
export const useFetch = (url) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  const [fetcher, setFetcher] = useState(false)
  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        const response = await axiosInstance.get(url)
        response.data && setLoading(false)
        // console.log(response.data)
        setData(response.data)
      } catch (error) {
        console.log(error.response)
      }
    }
    fetchData()
  }, [url, fetcher])
  return { data, loading, setFetcher, fetcher }
}
