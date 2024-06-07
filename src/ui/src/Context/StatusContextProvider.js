import React, { createContext, useState } from "react";

export const StatusContext = createContext();

const StatusContextProvider = ({ children }) => {
    const [status, setStatus] = useState("notStarted");
    return (
        <StatusContext.Provider value={[status, setStatus]}>
            {children}
        </StatusContext.Provider>
    );
};

export default StatusContextProvider;
