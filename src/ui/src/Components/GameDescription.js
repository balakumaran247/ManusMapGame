import React, { useCallback, useContext, useEffect } from "react";
import { Button, Col, Container, Row } from "reactstrap";
import { StatusContext } from "../Context/StatusContextProvider";
import { QuestionContext } from "../Context/QuestionContextProvider";
import { UrlContext } from "../Context/UrlContextProvider";
import Axios from "axios";

function GameDescription() {
    let [status, setStatus] = useContext(StatusContext);
    const { api_url } = useContext(UrlContext);
    const changeStatus = () =>
        status === "notStarted"
            ? setStatus("started")
            : console.error("status should be notStarted.");
    const [question, setQuestion] = useContext(QuestionContext);

    const fetchQuestion = useCallback(async () => {
        try {
            const { data } = await Axios.get(`${api_url}/question`);
            setQuestion({ start: data.start, end: data.end });
        } catch (error) {
            console.error("Error fetching question:", error);
        }
    }, [api_url, setQuestion]);
    useEffect(() => {
        fetchQuestion();
    }, [fetchQuestion]);
    console.log(`Question right now: ${question.start}, ${question.end}`);

    return (
        <Container fluid="md" className="mt-4">
            <Row className="justify-content-center  align-items-center">
                <Col
                    md="4"
                    className="d-flex justify-content-center align-items-center"
                >
                    <img
                        src={require("../Resources/manu.png")}
                        style={{
                            borderRadius: "50%",
                            border: "5px solid #FEEFAD",
                            width: 325,
                            height: 325,
                            display: "block",
                        }}
                        alt="Manu"
                    />
                </Col>
                <Col
                    md="8"
                    className="justify-content-center align-items-center"
                >
                    <p className="text-justify text-muted">
                        Aute elit fugiat duis adipisicing dolor. Ut excepteur
                        anim sunt enim incididunt est duis. Pariatur enim aute
                        ullamco deserunt.
                    </p>
                    <p className="text-justify text-muted">
                        Labore minim dolore ex ad dolor eu nostrud reprehenderit
                        aliquip laborum dolor excepteur. Duis dolore pariatur
                        culpa pariatur et exercitation commodo anim ad proident
                        id et excepteur. Voluptate voluptate sit nulla
                        exercitation qui duis non mollit occaecat sunt elit
                        nostrud amet.
                    </p>
                    <p className="text-justify text-muted">
                        Ex enim mollit laborum laborum. Sint culpa sunt ex
                        tempor id aliquip fugiat eu consequat sit anim nostrud.
                        Quis est Lorem cupidatat non dolore adipisicing ipsum
                        anim. Elit sit aliquip ullamco veniam sit ea. Lorem
                        deserunt culpa nostrud nostrud. Eiusmod esse amet sunt
                        cillum reprehenderit excepteur minim dolor do laboris
                        tempor cillum. Commodo ullamco qui sunt fugiat ea ipsum
                        magna duis velit enim minim id velit.
                    </p>
                    <div className="text-center">
                        <Button color="warning" outline onClick={changeStatus}>
                            Start <i className="bi bi-caret-right-fill"></i>
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default GameDescription;
