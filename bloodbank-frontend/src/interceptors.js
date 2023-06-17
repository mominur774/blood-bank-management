import axios from "axios";
import Cookies from "js-cookie";

export const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/"

const useInterceptor = () => {
  const instance = axios.create({
    baseURL: NEXT_PUBLIC_API_URL,
    timeout: "10000"
  })

  instance.defaults.headers.common["Content-Type"] = "application/json"
  instance.defaults.headers.common["Accept"] = "application/json"

  instance.interceptors.request.use(
    config => {
      const authToken = Cookies.get('accessToken');
      if (authToken) {
        config.headers['Authorization'] = "Bearer " + authToken;
      }
      return config
    },
    error => {
      return Promise.reject(error)
    }
  )
  instance.interceptors.response.use(
    response => {
      return response
    },
    error => {
      return Promise.reject(error)
    }
  )
  return instance
}

export default useInterceptor