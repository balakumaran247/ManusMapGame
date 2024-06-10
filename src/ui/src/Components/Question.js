import React, { useContext, useEffect, useRef, useState } from "react";
import { QuestionContext } from "../Context/QuestionContextProvider";
import { Col, Container, Row, Progress } from "reactstrap";
import InputSection from "./InputSection";

const Question = () => {
    const [question] = useContext(QuestionContext);
    const [progress, setProgress] = useState(0);
    const LoadingScreen = useRef();
    const InputScreen = useRef();

    useEffect(() => {
        const duration = 2 * 60 * 1000; // 2 minutes in milliseconds
        const interval = 100; // Update every 100ms
        const totalSteps = duration / interval;

        let currentStep = 0;

        const timer = setInterval(() => {
            currentStep += 1;
            setProgress((currentStep / totalSteps) * 100);

            if (currentStep >= totalSteps) {
                clearInterval(timer);
            }
        }, interval);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        switch (question.start) {
            case "none":
                LoadingScreen.current.style.display = "";
                InputScreen.current.style.display = "none";
                break;
            default:
                LoadingScreen.current.style.display = "none";
                InputScreen.current.style.display = "";
        }
        return () => {
            console.log("UI of Input Section is updated");
        };
    }, [question]);

    return (
        <div>
            <div ref={LoadingScreen}>
                <Container fluid className="d-flex">
                    <Row className="w-100 justify-content-center align-items-center">
                        <Col className="text-center">
                        <div style={{position: "absolute",top: "50%",left: "50%",transform: "translate(-50%, -50%)",}}>
                            <p className="display-5 light-yellow">
                                <i className="bi bi-hourglass-split"></i>{" "}
                                Loading...
                            </p>
                            <Progress
                                animated
                                color="warning"
                                value={progress}
                                className="mt-2"
                            />
                        </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div ref={InputScreen} className="text-center my-5">
                <Container>
                    <Row className="justify-content-md-center">
                        <Col
                            md="2"
                            className="d-flex justify-content-center align-items-center"
                        >
                            <img
                                src={require("../Resources/manu.png")}
                                style={{
                                    borderRadius: "50%",
                                    border: "5px solid #FEEFAD",
                                    width: 100,
                                    height: 100,
                                    display: "block",
                                }}
                                alt="Manu"
                            />
                        </Col>
                        <Col
                            md="4"
                            className="py-4 text-justify justify-content-center"
                        >
                            <p>
                                For traveling by road from {question.start}{" "}
                                which countries to pass through to reach{" "}
                                {question.end}?
                            </p>
                        </Col>
                    </Row>
                </Container>
                <InputSection />
            </div>
        </div>
    );
};

export default Question;
