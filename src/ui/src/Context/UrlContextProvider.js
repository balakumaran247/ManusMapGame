import React, { createContext } from "react";

export const UrlContext = createContext();

const UrlContextProvider = ({ children }) => {
    const api_url = "https://sore-fifine-bkprojs-f893f910.koyeb.app";
    return (
        <UrlContext.Provider value={{ api_url }}>
            {children}
        </UrlContext.Provider>
    );
};

export default UrlContextProvider;
