import React, { useContext, useEffect, useRef } from "react";
import { QuestionContext } from "../Context/QuestionContextProvider";
import { Button, Col, Container, Row } from "reactstrap";
import InputSection from "./InputSection";
import ChangeQuestion from "./ChangeQuestion";

const Question = () => {
    const [question, setQuestion] = useContext(QuestionContext);
    const LoadingScreen = useRef();
    const InputScreen = useRef();
    const ChangeScreen = useRef();

    useEffect(() => {
        switch (question.start) {
            case "none":
                LoadingScreen.current.style.display = "";
                InputScreen.current.style.display = "none";
                ChangeScreen.current.style.display = "none";
                break;
            case "toChange":
                LoadingScreen.current.style.display = "none";
                InputScreen.current.style.display = "none";
                ChangeScreen.current.style.display = "";
                break;
            default:
                LoadingScreen.current.style.display = "none";
                InputScreen.current.style.display = "";
                ChangeScreen.current.style.display = "none";
        }
        return () => {
            console.log("UI of Input Section is updated");
        };
    }, [question]);

    const toChangeQuestion = () => {
        setQuestion({ start: "toChange", end: "toChange" });
    };

    return (
        <div>
            <div ref={LoadingScreen}>
                <Container fluid className="d-flex">
                    <Row className="w-100 justify-content-center align-items-center">
                        <Col className="text-center">
                            <div
                                style={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                }}
                            >
                                <p className="display-5 light-yellow">
                                    <i className="bi bi-hourglass-split"></i>{" "}
                                    Loading...
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div ref={ChangeScreen}>
                <ChangeQuestion />
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
                            <div className="text-center mb-5">
                                <Button
                                    color="secondary"
                                    onClick={toChangeQuestion}
                                >
                                    Change Question
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <InputSection />
            </div>
        </div>
    );
};

export default Question;
