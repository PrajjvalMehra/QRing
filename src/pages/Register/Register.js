import React from "react";
import { Col, Row } from "antd";
import Header from "../../components/Header/Header";
import { LockOutlined, MailOutlined, CheckOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useState } from "react";
import { logout, register } from "../../utils/auth";
import { sendEmailVerification, signOut } from "firebase/auth";

import "./Register.scss";
function Register() {
    const [errorMessage, setErrorMessage] = useState("");
    const [alertColor, setAlertColor] = useState("red");
    const onFinish = (values) => {
        console.log("Received values of form: ", values);
        if (values.password !== values.confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }
        register(values.email, values.password)
            .then((userCredential) => {
                setAlertColor("green");
                setErrorMessage(
                    "Success! Please check your email for verification."
                );
                sendEmailVerification(userCredential.user, {
                    url: "http://localhost:3000",
                    handleCodeInApp: true,
                }).then(() => {
                    console.log("Email sent.");
                    return logout();
                });
            })
            .catch((error) => {
                console.log(error.code);
                setAlertColor("red");
                switch (error.code) {
                    case "auth/email-already-in-use":
                        setErrorMessage("Email already in use.");
                        break;
                    case "auth/invalid-email":
                        setErrorMessage("Invalid email.");
                        break;
                    case "auth/weak-password":
                        setErrorMessage("Password is too weak.");
                        break;
                    default:
                        setErrorMessage(error.code);
                }
            });
    };
    return (
        <>
            <Header />
            <Row justify="space-around" align="middle" className="content">
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Col className="formContainer" span={24}>
                        <div className="descriptionContainer">
                            <h1>Use QR codes as a doorbell.</h1>
                        </div>
                        <h2>Register</h2>

                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                            onFinishFailed={(errorInfo) => {
                                console.log("Failed:", errorInfo);
                            }}
                        >
                            <Form.Item
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter your email.",
                                    },
                                ]}
                            >
                                <Input
                                    prefix={
                                        <MailOutlined className="site-form-item-icon" />
                                    }
                                    placeholder="Email"
                                />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your Password!",
                                    },
                                ]}
                            >
                                <Input
                                    prefix={
                                        <LockOutlined className="site-form-item-icon" />
                                    }
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Item>
                            <Form.Item
                                name="confirmPassword"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Please confirm your Password!",
                                    },
                                ]}
                            >
                                <Input
                                    prefix={
                                        <CheckOutlined className="site-form-item-icon" />
                                    }
                                    type="password"
                                    placeholder="Confirm Password"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="login-form-button"
                                >
                                    Register
                                </Button>
                            </Form.Item>
                        </Form>
                        <div style={{ height: "18px" }}>
                            {errorMessage && (
                                <h4 style={{ color: alertColor }}>
                                    {" "}
                                    {errorMessage}{" "}
                                </h4>
                            )}
                        </div>
                    </Col>
                </div>
            </Row>
        </>
    );
}

export default Register;
