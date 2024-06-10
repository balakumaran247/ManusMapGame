import React, { createContext, useState } from "react";

export const AnswerContext = createContext();

const AnswerContextProvider = ({ children }) => {
    const [answer, setAnswer] = useState({
        result: "none",
        correct_path: "none",
        wrong_path: "none",
    });
    return (
        <AnswerContext.Provider value={[answer, setAnswer]}>
            {children}
        </AnswerContext.Provider>
    );
};

export default AnswerContextProvider;
