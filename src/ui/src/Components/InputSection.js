import React, { useContext } from "react";
import { Button, Col, Container, Row } from "reactstrap";
import { StatusContext } from "../Context/StatusContextProvider";

const InputSection = () => {
    let [status, setStatus] = useContext(StatusContext);
    const changeStatus = () =>
        status === "started"
            ? setStatus("ended")
            : console.error("status should be started.");
    return (
        <Container className="text-center">
            <Row>
                <Col>Input Element</Col>
            </Row>
            <Row>
                <Col>
                    <Button color="warning" outline onClick={changeStatus}>
                        Submit <i className="bi bi-caret-right-fill"></i>
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col>Input Tree</Col>
            </Row>
        </Container>
    );
};

export default InputSection;
