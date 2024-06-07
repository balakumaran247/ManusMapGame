import React, { createContext, useState } from "react";

export const QuestionContext = createContext();

const QuestionContextProvider = ({ children }) => {
    const [question, setQuestion] = useState({ start: "none", end: "none" });
    return (
        <QuestionContext.Provider value={[question, setQuestion]}>
            {children}
        </QuestionContext.Provider>
    );
};

export default QuestionContextProvider;
