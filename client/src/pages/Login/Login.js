import "../Login/Login.scss";
import { Col, Row } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { login, logout } from "../../utils/auth";
import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { Link } from "react-router-dom";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import Loader from "../../components/Loader/Loader";
import { useNavigate } from "react-router-dom";

function Login() {
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(getAuth(), (user) => {
            if (user) {
                if (user.emailVerified === false) {
                    setErrorMessage("Please verify your email.");
                    logout();
                    setLoading(false);
                    return;
                }
                localStorage.setItem("user", JSON.stringify(user));
                setLoading(false);

                navigate("/dashboard");
            } else {
                setLoading(false);
            }
        });
    }, []);

    const onFinish = (values) => {
        login(values.username, values.password)
            .then(async (userCredential) => {
                // Signed in
                if (userCredential.user.emailVerified === false) {
                    setErrorMessage("Please verify your email.");
                    return;
                }
                setErrorMessage("");
                navigate("/dashboard");
            })
            .catch((error) => {
                console.log(error.code);
                switch (error.code) {
                    case "auth/invalid-email":
                        setErrorMessage("Invalid email.");
                        break;
                    case "auth/too-many-requests":
                        setErrorMessage("Too many requests. Try again later.");
                        break;
                    case "auth/user-not-found":
                        setErrorMessage("User not found or invalid email.");
                        break;
                    case "auth/wrong-password":
                        setErrorMessage("Wrong password.");
                        break;
                    default:
                        setErrorMessage("Unknown error.");
                }
            });
    };

    return (
        <div style={{ height: "100%", overflow: "hidden" }}>
            <Header title={"QRing"} />

            <Row span={24} justify="center" className="content">
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    {loading ? (
                        <div style={{ paddingTop: "10em" }}>
                            <Loader />
                        </div>
                    ) : (
                        <Col className="formContainer" span={24}>
                            <div className="descriptionContainer">
                                <h1>Use QR codes as a doorbell.</h1>
                            </div>
                            <h2 style={{ paddingBottom: "20px" }}>Log in</h2>

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
                                    name="username"
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
                                            message:
                                                "Please input your Password!",
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
                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        className="login-form-button"
                                        style={{
                                            marginRight: "10px",
                                            minWidth: "90px",
                                        }}
                                    >
                                        Log in
                                    </Button>
                                    <Button
                                        type="text"
                                        className="login-form-button"
                                        style={{
                                            marginRight: "10px",
                                            minWidth: "90px",
                                        }}
                                    >
                                        <Link to="/register">Register</Link>
                                    </Button>
                                </Form.Item>
                            </Form>
                            {errorMessage && (
                                <h3 style={{ color: "red" }}>
                                    {" "}
                                    {errorMessage}{" "}
                                </h3>
                            )}
                        </Col>
                    )}
                </div>
            </Row>
        </div>
    );
}

export default Login;
