import React, { useContext } from "react";
import { Button, Col, Container, Row } from "reactstrap";
import { StatusContext } from "../Context/StatusContextProvider";

const ResultSection = () => {
    let [status, setStatus] = useContext(StatusContext);
    const changeStatus = () =>
        status === "ended"
            ? setStatus("started")
            : console.error("status should be ended.");
    return (
        <Container className="text-center">
            <Row>
                <Col>You Won</Col>
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
    );
};

export default ResultSection;
