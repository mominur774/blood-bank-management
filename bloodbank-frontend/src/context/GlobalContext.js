import useApiHelper from "@/api";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react"

const GlobalContext = React.createContext();

const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [user, setUser] = useState({});

  const api = useApiHelper();

  useEffect(() => {
    if (Cookies.get('accessToken')) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  })

  useEffect(() => {
    if (isLoggedIn) {
      api.getUser().then(res => {
        setUser(res.data)
      }).catch(error => {
        console.log(error)
      })
    }
  }, [isLoggedIn])

  return (
    <GlobalContext.Provider value={{
      isLoggedIn,
      user,
      setIsLoggedIn
    }}>
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalContext;
export { GlobalProvider };