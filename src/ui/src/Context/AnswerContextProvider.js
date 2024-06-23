import React, { createContext, useState } from "react";

export const AnswerContext = createContext();

const AnswerContextProvider = ({ children }) => {
    const [result, setResult] = useState("none");
    const [correctPath, setCorrectPath] = useState([]);
    const [wrongPath, setWrongPath] = useState([]);
    const [shortestPath, setShortestPath] = useState([]);
    const [boundaries, setBoundaries] = useState(null);
    const [centroids, setCentroids] = useState(null);

    return (
        <AnswerContext.Provider
            value={{
                result,
                setResult,
                correctPath,
                setCorrectPath,
                wrongPath,
                setWrongPath,
                shortestPath,
                setShortestPath,
                boundaries,
                setBoundaries,
                centroids,
                setCentroids,
            }}
        >
            {children}
        </AnswerContext.Provider>
    );
};

export default AnswerContextProvider;
