import React from "react";
import { Col, Row, Button } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import "../Header/Header.scss";
import { useNavigate } from "react-router-dom";

function Header(props) {
    const navigator = useNavigate();
    return (
        <Row className="header">
            <Col flex="10px">
                {props.hasBackButton == true ? (
                    <Button
                        onClick={(e) => {
                            navigator(-1);
                        }}
                        type="text"
                        style={{ color: "white" }}
                    >
                        <LeftOutlined />
                    </Button>
                ) : null}
            </Col>
            <Col flex={"auto"}>
                <h2>{props.title}</h2>
            </Col>
        </Row>
    );
}

export default Header;
