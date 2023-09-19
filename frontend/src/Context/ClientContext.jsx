import { createContext, useCallback, useContext, useEffect, useState } from "react";

export const ClientContext = createContext();

export const ClientContextProvider = ( { children } ) => {
    const [client, setClient] = useState(undefined);

    function login(client) {
        setClient(client);
    }

    const checkAuthState = useCallback( () => {
        const authtoken = localStorage.getItem("Token");
        login(authtoken);
        //read token from local storage, send req to check auth, save to state
        //useEffect to make it authomatic
        //set null or something!
    }, [])

    useEffect(function () {
        checkAuthState()
    }, [checkAuthState])
    

 return (
    <ClientContext.Provider value={{ client, login }}>{children}</ClientContext.Provider>
 )
}

export const useClient = () => {
    return useContext(ClientContext)
}

export const fetchWithToken = (method, token, url, body) => {
    const headers = {
      "Content-Type": "application/json",
    };
  
    const fetchOptions = {
      method: method,
      headers: headers,
    };
  
    if (body !== null) {
      fetchOptions.body = JSON.stringify(body);
    }

    if (token !== null) {
        headers["Authorization"] = token;
      }
  
    return fetch(url, fetchOptions);
  };