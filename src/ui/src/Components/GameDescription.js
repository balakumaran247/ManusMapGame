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
                        src={require("../Resources/profile.jpeg")}
                        className="img-fluid"
                        style={{
                            border: "5px solid #FEEFAD",
                            width: 325,
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
                        Manu loved maps. His photographic memory made him a
                        master of geography. His favorite game was asking, "If
                        you have to go from Singapore to London by road, which
                        is the shortest route? Name all the countries." We
                        played this game every Friday for eight years. If you
                        ever got the order wrong, Manu would laugh and say, "How
                        dumb can you be, to believe that India and Thailand
                        share a border?" If you got it right, he'd add a twist:
                        "There's a civil war in Syria; you need to go around
                        it."
                    </p>
                    <p className="text-justify text-muted">
                        Manu's superpower was bringing people together in
                        meaningful ways. This game broke the ice and sparked
                        conversations. Its purpose was to foster connections
                        more than getting it right. This Friday, as you wind
                        down into the weekend, play this game with your loved
                        ones. Connect, laugh, and remember Manu through the joy
                        of his favorite game. Enjoy!
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
                    <div className="text-center mb-5">
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
