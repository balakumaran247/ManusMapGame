import React, { createContext } from "react";

export const UrlContext = createContext();

const UrlContextProvider = ({ children }) => {
    const api_url = "https://manusmapgame.onrender.com";
    return (
        <UrlContext.Provider value={{ api_url }}>
            {children}
        </UrlContext.Provider>
    );
};

export default UrlContextProvider;
