import React, { useContext, useState } from "react";
import { Button, Col, Container, Row } from "reactstrap";
import { CountriesList } from "../Resources/countries_list";
import { QuestionContext } from "../Context/QuestionContextProvider";
import { UrlContext } from "../Context/UrlContextProvider";
import Select from "react-select";
import Axios from "axios";

const ChangeQuestion = () => {
    const { api_url } = useContext(UrlContext);
    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);
    const [selected, setSelected] = useState({ start: null, end: null });
    const [message, setMessage] = useState(null);
    const [, setQuestion] = useContext(QuestionContext);

    const handleStart = (selection) => {
        setStart(selection);
        setSelected({ ...selected, start: selection.label });
        setMessage(null);
    };

    const handleEnd = (selection) => {
        setEnd(selection);
        setSelected({ ...selected, end: selection.label });
        setMessage(null);
    };

    const handleAdd = () => {
        const fetchCheck = async () => {
            try {
                const { data } = await Axios.get(
                    `${api_url}/check?start=${selected.start}&end=${selected.end}`
                );
                console.log("question check: ", data, selected);
                if (selected.start && selected.end && data) {
                    setQuestion({ start: selected.start, end: selected.end });
                    setMessage(null);
                    setStart(null);
                    setEnd(null);
                    setSelected({ start: null, end: null });
                } else {
                    setMessage("start & end are incompatible");
                }
            } catch (error) {
                console.error("Error fetching check question:", error);
            }
        };
        fetchCheck();
    };

    return (
        <div>
            <Container>
                <Row className="justify-content-md-center align-items-center my-3">
                    <Col>
                        <img
                            src={require("../Resources/worldMap.jpg")}
                            className="img-fluid"
                            style={{
                                border: "5px solid #FEEFAD",
                                display: "block",
                            }}
                            alt="world map"
                        />
                    </Col>
                </Row>
                <Row className="justify-content-md-center align-items-center my-1">
                    <Col md="2">
                        <p>Start:</p>
                    </Col>
                    <Col md="6">
                        <Select
                            options={CountriesList}
                            value={start}
                            onChange={handleStart}
                        />
                    </Col>
                </Row>
                <Row className="justify-content-md-center align-items-center">
                    <Col md="2">
                        <p>End:</p>
                    </Col>
                    <Col md="6">
                        <Select
                            options={CountriesList}
                            value={end}
                            onChange={handleEnd}
                        />
                    </Col>
                </Row>
                <Row className="justify-content-md-center align-items-center my-1">
                    <Col className="text-center">
                        <Button
                            color="warning"
                            outline
                            onClick={handleAdd}
                            disabled={!start || !end || start === end}
                        >
                            Update
                        </Button>
                    </Col>
                </Row>
                <Row className="justify-content-md-center align-items-center my-1">
                    <Col className="text-center">
                        <p className="text-danger">{message}</p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ChangeQuestion;
