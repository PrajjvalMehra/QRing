import React from "react";
import "./AddHouse.scss";
import Header from "../../components/Header/Header";
import { Col, Form, Input, Row, Typography, Button, Switch } from "antd";
import { Checkbox } from "antd";
import Loader from "../../components/Loader/Loader";
import { useState } from "react";
import { addHouse } from "../../utils/houseQueries";
import { calcCrow, geoFindMe } from "../../utils/geoFence";
import StepLoader from "../../components/StepLoader/StepLoader";
import { AimOutlined } from "@ant-design/icons";

import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const { Text, Title } = Typography;

function AddHouse() {
    const navigator = useNavigate();
    const [loading, setLoading] = useState(false);
    const [current, setCurrent] = useState(0);
    const [useLocation, setUseLocation] = useState(false);
    const [coordinates, setCoordinates] = useState([0, 0]);
    const [showError, setShowError] = useState(false);
    const [steps, setSteps] = useState([
        {
            title: "House Name",
            current: 50,
            step: 1,
        },
        {
            title: "House Location",
            current: 100,
            step: 2,
        },
    ]);
    const submitHouse = async (values) => {
        setShowError(false);
        setLoading(true);
        if (!values.houseName) {
            setShowError(true);
            setLoading(false);
            return;
        }
        let houseId = uuidv4();
        if (useLocation) {
            requestLocation(values.houseName, houseId);
            return;
        }

        await addHouse(values.houseName, [0, 0], houseId).then((res) => {
            navigator("/house/" + houseId);
        });
        setLoading(false);
    };

    const onChange = (e) => {
        setUseLocation(e.target.checked ? true : false);
    };

    const requestLocation = (houseName, houseId) => {
        setLoading(true);
        if (!useLocation) return;
        geoFindMe()
            .then((location) => {
                addHouse(houseName, location, houseId);
                setLoading(false);
                navigator("/house/" + houseId);
            })
            .catch((error) => {
                console.log(`Error: ${error}`);
            });
    };
    return (
        <>
            <Header hasBackButton={true} title={"Add House"} />
            <div style={{ paddingTop: "60px" }}>
                <div className="tabContainer">
                    <Row>
                        <Col
                            className="addHouseContainer"
                            style={{ width: "100%" }}
                        >
                            <Form
                                name="basic"
                                initialValues={{ remember: true }}
                                layout="vertical"
                                onFinish={submitHouse}
                            >
                                <Form.Item
                                    label={
                                        <>
                                            <h2>{steps[current].title}</h2>
                                        </>
                                    }
                                    name="houseName"
                                >
                                    <Input placeholder="House Name" />
                                </Form.Item>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        marginBottom: "40px",
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontWeight: "bold",
                                            fontSize: "14px",
                                        }}
                                    >
                                        <Checkbox onChange={onChange} /> &nbsp;
                                        Add location to secure the QR code.{" "}
                                    </Text>
                                </div>
                                <Form.Item>
                                    <Button
                                        type="primary"
                                        style={{
                                            width: "100%",
                                            height: "40px",
                                        }}
                                        htmlType="submit"
                                        loading={loading}
                                    >
                                        Add House
                                    </Button>
                                    {showError && (
                                        <h4 style={{ color: "red" }}>
                                            Please enter a house name.
                                        </h4>
                                    )}
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    );
}

export default AddHouse;
