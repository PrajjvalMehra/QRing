import React from "react";
import { Col, Row } from "antd";
import "../Header/Header.scss";

function Header() {
    return (
        <Row className="header">
            <Col span={24}>
                <h2>QRing</h2>
            </Col>
        </Row>
    );
}

export default Header;
