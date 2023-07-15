import React from "react";
import { Col, Row, Button } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import Logo from "../../assets/logo-no-bg.png";
import "../Header/Header.scss";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";

function Header(props) {
    const navigator = useNavigate();
    return (
        <Row className="header">
            <Col flex="10px">
                {props.hasBackButton === true ? (
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
            {props.title === undefined ? (
                <Loader type={"header"} />
            ) : (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    {props.title === "QRing" && (
                        <img
                            src={Logo}
                            style={{ height: "50px", width: "auto" }}
                        />
                    )}
                    <h2>{props.title}</h2>
                </div>
            )}
        </Row>
    );
}

export default Header;
