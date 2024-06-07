import React, { createContext, useState } from "react";

export const AnswerContext = createContext();

const AnswerContextProvider = ({ children }) => {
    const [answer, setAnswer] = useState({ start: "none", end: "none" });
    return (
        <AnswerContext.Provider value={[answer, setAnswer]}>
            {children}
        </AnswerContext.Provider>
    );
};

export default AnswerContextProvider;
