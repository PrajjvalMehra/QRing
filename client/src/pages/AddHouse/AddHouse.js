import React from "react";
import "./AddHouse.scss";
import Header from "../../components/Header/Header";
import { Col, Form, Input, Row, Typography, Button, Switch } from "antd";
import Loader from "../../components/Loader/Loader";
import { useState } from "react";
import { addHouse } from "../../utils/houseQueries";
import { geoFindMe } from "../../utils/geoFence";

const { Text, Title } = Typography;

function AddHouse() {
    const [loading, setLoading] = useState(false);
    const submitHouse = async (values) => {
        if (!values.houseName) return;
        console.log(values.houseName);
        setLoading(true);
        await addHouse(values.houseName);
        setLoading(false);
    };

    const requestLocation = async () => {
        geoFindMe();
    };
    return (
        <>
            <Header hasBackButton={true} title={"Add House"} />
            <div>
                <div className="tabContainer">
                    <Row>
                        <Col>
                            <Form
                                name="basic"
                                initialValues={{ remember: true }}
                                layout="vertical"
                                onFinish={submitHouse}
                            >
                                <Form.Item
                                    label={<Text>House Name</Text>}
                                    name="houseName"
                                >
                                    <Input placeholder="House Name" />
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit">
                                        Add House
                                    </Button>
                                    {loading && <Loader size={12} />}
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
