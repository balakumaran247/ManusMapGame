import React, { useRef, useContext, useEffect } from "react";
import GameHeading from "./GameHeading";
import GameDescription from "./GameDescription";
import { StatusContext } from "../Context/StatusContextProvider";
import Question from "./Question";
import ResultSection from "./ResultSection";

const PageDynamics = () => {
    const [status] = useContext(StatusContext);
    const homePage = useRef();
    const gamePage = useRef();
    const resultPage = useRef();

    useEffect(() => {
        console.log("Status of the Game: ", status);
        switch (status) {
            case "started":
                homePage.current.style.display = "none";
                gamePage.current.style.display = "";
                resultPage.current.style.display = "none";
                break;
            case "ended":
                homePage.current.style.display = "none";
                gamePage.current.style.display = "none";
                resultPage.current.style.display = "";
                break;
            default:
                homePage.current.style.display = "";
                gamePage.current.style.display = "none";
                resultPage.current.style.display = "none";
        }
        return () => {
            console.log("UI updated based on status");
        };
    }, [status]);

    return (
        <div>
            <GameHeading />
            <div ref={homePage}>
                <GameDescription />
            </div>
            <div ref={gamePage}>
                <Question />
            </div>
            <div ref={resultPage}>
                <ResultSection />
            </div>
        </div>
    );
};

export default PageDynamics;
