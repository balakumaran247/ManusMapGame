import React, { useContext, useEffect, useRef } from "react";
import { Button, Col, Container, Row } from "reactstrap";
import { StatusContext } from "../Context/StatusContextProvider";
import { AnswerContext } from "../Context/AnswerContextProvider";
import { QuestionContext } from "../Context/QuestionContextProvider";
import { UrlContext } from "../Context/UrlContextProvider";
import Axios from "axios";

const ResultSection = () => {
    let [status, setStatus] = useContext(StatusContext);
    let [answer, setAnswer] = useContext(AnswerContext);
    let [, setQuestion] = useContext(QuestionContext);
    const { api_url } = useContext(UrlContext);
    const LoadingScreen = useRef();
    const ResultScreen = useRef();

    const changeStatus = () => {
        setQuestion({start: "none", end: "none"});
        setAnswer({result: "none", correct_path: "none", wrong_path: "none"});
        const fetchQuestion = async () => {
            try {
                const { data } = await Axios.get(`${api_url}/question`);
                setQuestion({ start: data.start, end: data.end });
            } catch (error) {
                console.error("Error fetching question:", error);
            }
        };
        fetchQuestion();
        status === "ended"
            ? setStatus("started")
            : console.error("status should be ended.");
    };

    useEffect(() => {
        switch (answer.result) {
            case "none":
                LoadingScreen.current.style.display = "";
                ResultScreen.current.style.display = "none";
                break;
            default:
                LoadingScreen.current.style.display = "none";
                ResultScreen.current.style.display = "";
                console.log("Answer entered: ", answer);
        }
        return () => {
            console.log("UI of Result Section is updated");
        };
    }, [answer]);

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
                        </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div ref={ResultScreen} className="text-center my-5">
        <Container className="text-center">
            <Row>
                <Col>{answer.result}</Col>
            </Row>
            <Row>
                <Col>
                    <Button color="warning" outline onClick={changeStatus}>
                        Restart <i className="bi bi-arrow-clockwise"></i>
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col>Result Tree</Col>
            </Row>
        </Container>
        </div>
        </div>
    );
};

export default ResultSection;
