import React, { createContext, useState } from "react";

export const AnswerContext = createContext();

const AnswerContextProvider = ({ children }) => {
    const [result, setResult] = useState("none");
    const [correctPath, setCorrectPath] = useState([]);
    const [wrongPath, setWrongPath] = useState([]);
    const [shortestPath, setShortestPath] = useState([]);
    
    return (
        <AnswerContext.Provider value={{ result, setResult, correctPath, setCorrectPath, wrongPath, setWrongPath, shortestPath, setShortestPath }}>
            {children}
        </AnswerContext.Provider>
    );
};

export default AnswerContextProvider;
