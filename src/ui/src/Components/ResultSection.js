import React, { useContext, useEffect, useRef } from "react";
import { Button, Col, Container, Row } from "reactstrap";
import { StatusContext } from "../Context/StatusContextProvider";
import { AnswerContext } from "../Context/AnswerContextProvider";
import { QuestionContext } from "../Context/QuestionContextProvider";
import { UrlContext } from "../Context/UrlContextProvider";
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Axios from "axios";

import ricon from "../Resources/marker-icon-red.png";
import gicon from "../Resources/marker-icon-green.png";
import shadow from "../Resources/marker-shadow.png";

let RedIcon = L.icon({
    iconUrl: ricon,
    shadowUrl: shadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

let GreenIcon = L.icon({
    iconUrl: gicon,
    shadowUrl: shadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

const ResultSection = () => {
    let [status, setStatus] = useContext(StatusContext);
    const {
        result,
        setResult,
        correctPath,
        setCorrectPath,
        wrongPath,
        setWrongPath,
        shortestPath,
        setShortestPath,
        boundaries,
        setBoundaries,
        centroids,
        setCentroids,
    } = useContext(AnswerContext);
    let [, setQuestion] = useContext(QuestionContext);
    const { api_url } = useContext(UrlContext);
    const LoadingScreen = useRef();
    const ResultScreen = useRef();

    const changeStatus = () => {
        setQuestion({ start: "none", end: "none" });
        setResult("none");
        setCorrectPath([]);
        setWrongPath([]);
        setShortestPath([]);
        setBoundaries(null);
        setCentroids(null);
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
        switch (result) {
            case "none":
                LoadingScreen.current.style.display = "";
                ResultScreen.current.style.display = "none";
                break;
            default:
                LoadingScreen.current.style.display = "none";
                ResultScreen.current.style.display = "";
        }
        return () => {
            console.log("UI of Result Section is updated");
        };
    }, [result]);

    const styleFunction = (feature) => {
        return { color: feature.properties.color };
    };

    const onEachMarker = (feature, layer) => {
        if (feature.properties.color === "red") {
            layer.setIcon(RedIcon);
        } else {
            layer.setIcon(GreenIcon);
        }
        if (feature.properties && feature.properties.NAME_EN) {
            layer.bindPopup(feature.properties.NAME_EN);
        }
    };

    const onEachFeature = (feature, layer) => {
        if (feature.properties && feature.properties.NAME_EN) {
            layer.bindPopup(feature.properties.NAME_EN);
        }
    };

    const FlyToFeature = ({ featureData }) => {
        const map = useMap();
        useEffect(() => {
            if (featureData) {
                const geoJsonLayer = L.geoJSON(featureData);
                const bounds = geoJsonLayer.getBounds();
                map.flyToBounds(bounds, { padding: [50, 50] });
            }
        }, [featureData, map]);
        return null;
    };

    const textColorClass =
        result === "You Lost" ? "text-danger" : "text-success";

    const ResultText =
        result === "You Lost"
            ? "You need to stare at maps more often, the order was incorrect, please try again!"
            : "Amazing! Looks like you love maps as much as I do!";

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
            <div ref={ResultScreen} className="text-center my-5">
                <Container className="text-center">
                    <Row>
                        <Col>
                            <p className={`${textColorClass}`}>
                                <strong>{ResultText}</strong>
                            </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="my-3">
                            <Button
                                color="warning"
                                outline
                                onClick={changeStatus}
                            >
                                Restart{" "}
                                <i className="bi bi-arrow-clockwise"></i>
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {console.log("final answer:", {
                                r: result,
                                c: correctPath,
                                w: wrongPath,
                                s: shortestPath,
                                b: boundaries,
                                p: centroids,
                            })}
                            <div>
                                <p>
                                    {correctPath.map((option, index) => (
                                        <span key={index}>
                                            {option}
                                            {index < correctPath.length - 1 && (
                                                <i className="bi bi-arrow-right-short text-success"></i>
                                            )}
                                        </span>
                                    ))}
                                    {wrongPath.length > 0 && (
                                        <>
                                            <i className="bi bi-x text-danger"></i>
                                            {wrongPath.map((option, index) => (
                                                <span key={index}>
                                                    {option}
                                                    {index <
                                                        wrongPath.length -
                                                            1 && (
                                                        <i className="bi bi-x text-danger"></i>
                                                    )}
                                                </span>
                                            ))}
                                        </>
                                    )}
                                </p>
                                <p>
                                    {shortestPath.length > 0 && (
                                        <>
                                            <span className="text-success">
                                                Correct Path:{" "}
                                            </span>
                                            {shortestPath.map(
                                                (option, index) => (
                                                    <span key={index}>
                                                        {option}
                                                        {index <
                                                            shortestPath.length -
                                                                1 && (
                                                            <i className="bi bi-arrow-right-short text-success"></i>
                                                        )}
                                                    </span>
                                                )
                                            )}
                                        </>
                                    )}
                                </p>
                            </div>
                        </Col>
                    </Row>
                    <Row className="w-100 justify-content-center align-items-center">
                        <Col md="8">
                            <MapContainer
                                center={[22.3511148, 78.6677428]}
                                zoom={5}
                                scrollWheelZoom={false}
                                style={{ height: "500px", width: "100%" }}
                            >
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                {boundaries && (
                                    <GeoJSON
                                        data={boundaries}
                                        style={styleFunction}
                                        onEachFeature={onEachFeature}
                                    />
                                )}
                                {centroids && (
                                    <GeoJSON
                                        data={centroids}
                                        onEachFeature={onEachMarker}
                                    />
                                )}
                                {boundaries && (
                                    <FlyToFeature featureData={boundaries} />
                                )}
                            </MapContainer>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default ResultSection;
