import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import PageDynamics from "./Components/PageDynamics";
import StatusContextProvider from "./Context/StatusContextProvider";
import UrlContextProvider from "./Context/UrlContextProvider";
import QuestionContextProvider from "./Context/QuestionContextProvider";
import AnswerContextProvider from "./Context/AnswerContextProvider";
import { Analytics } from "@vercel/analytics/react";

function App() {
    return (
        <>
            <AnswerContextProvider>
                <QuestionContextProvider>
                    <UrlContextProvider>
                        <StatusContextProvider>
                            <PageDynamics />
                        </StatusContextProvider>
                    </UrlContextProvider>
                </QuestionContextProvider>
            </AnswerContextProvider>
            <Analytics />
        </>
    );
}

export default App;
