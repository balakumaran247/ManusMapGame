import React, { useContext, useState } from "react";
import { Button, Col, Container, Row } from "reactstrap";
import { StatusContext } from "../Context/StatusContextProvider";
import { QuestionContext } from "../Context/QuestionContextProvider";
import { AnswerContext } from "../Context/AnswerContextProvider";
import { UrlContext } from "../Context/UrlContextProvider";
import Select from "react-select";
import { CountriesList } from "../Resources/countries_list";
import Axios from "axios";

const InputSection = () => {
    let [status, setStatus] = useContext(StatusContext);
    const { api_url } = useContext(UrlContext);
    let [, setAnswer] = useContext(AnswerContext);
    const [question] = useContext(QuestionContext);
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const changeStatus = () => {
        const sendAnswer = async () => {
            try {
                const { data } = await Axios.post(`${api_url}/result`, {
                    start: question.start,
                    end: question.end,
                    item: selectedOptions.map((option, index) => (option.label))
                });
                setAnswer({result: data.result, correct_path: data.correct_path, wrong_path: data.wrong_path});
            } catch (error) {
                console.error("Error fetching result:", error);
            }
        };
        sendAnswer();
        status === "started"
            ? setStatus("ended")
            : console.error("status should be started.");
    };

    const handleChange = (selected) => {
        setSelectedOption(selected);
    };

    const handleAdd = () => {
        if (
            selectedOption &&
            !selectedOptions.some(
                (option) => option.value === selectedOption.value
            )
        ) {
            setSelectedOptions([...selectedOptions, selectedOption]);
            setSelectedOption(null);
        }
    };

    const handleClear = () => {
        setSelectedOptions([]);
    };

    return (
        <Container className="text-center">
            <Row className="justify-content-md-center align-items-center my-3">
                <Col md="5">
                    <Select
                        options={CountriesList}
                        value={selectedOption}
                        onChange={handleChange}
                    />
                </Col>
                <Col md="2" className="my-1">
                    <Button
                        color="primary"
                        outline
                        onClick={handleAdd}
                        disabled={!selectedOption}
                    >
                        <i className="bi bi-plus"></i>Add
                    </Button>
                </Col>
            </Row>
            <Row className="justify-content-md-center align-items-center my-3">
                <Col md="2" className="my-1">
                    <Button
                        color="danger"
                        outline
                        onClick={handleClear}
                        disabled={selectedOptions.length === 0}
                    >
                        <i className="bi bi-trash"></i> Clear
                    </Button>
                </Col>
                <Col md="2" className="my-1">
                    <Button
                        color="warning"
                        outline
                        onClick={changeStatus}
                        disabled={selectedOptions.length === 0}
                    >
                        Submit <i className="bi bi-caret-right-fill"></i>
                    </Button>
                </Col>
            </Row>
            <Row className="justify-content-md-center text-center align-items-center my-3">
                <Col md="7">
                    <div>
                        <h5>Your Path:</h5>
                        <p>
                            <span className="text-danger">
                                {question.start}
                            </span>{" "}
                            <i className="bi bi-arrow-right-short strong-yellow"></i>
                            {selectedOptions.map((option, index) => (
                                <span key={option.value}>
                                    {option.label}
                                    {/* {index < selectedOptions.length - 1 && ( */}
                                    <i className="bi bi-arrow-right-short strong-yellow"></i>
                                    {/* )} */}
                                </span>
                            ))}
                            <i className="bi bi-plus-circle text-primary"></i>
                            <i className="bi bi-arrow-right-short strong-yellow"></i>{" "}
                            <span className="text-success">{question.end}</span>
                        </p>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default InputSection;
