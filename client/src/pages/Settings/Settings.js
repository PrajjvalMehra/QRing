import React from "react";
import { logout } from "../../utils/auth";
import { Button, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { fetchUserInfoById } from "../../utils/userQueries";
import { Typography } from "antd";

const { Text, Title } = Typography;

function Settings() {
    const navigate = useNavigate();
    const [name, setName] = React.useState({});
    const signout = () => {
        logout().then(() => {
            localStorage.removeItem("uid");
            navigate("/");
        });
    };

    React.useEffect(() => {
        async function getName() {
            const data = await fetchUserInfoById(
                JSON.parse(localStorage.getItem("user")).uid
            );
            setName(data);
        }
        getName();
    }, []);

    const sendEmail = () => {
        if (!window.Email) return;
        window.Email.send({
            SecureToken: "6203f9ef-b72c-4316-a324-d5e46a22cf32",
            To: "wwwings420@gmail.com",
            From: "prajjvalmehra09@gmail.com",
            Subject: "This is the subject",
            Body: "And this is the body",
        }).then((message) => alert(message));
    };

    return (
        <div className="pageBG">
            <div className="tabContainer">
                <h1>Settings</h1>
                <Title level={4}>{name.name}</Title>
                <Title level={5}>{name.email}</Title>
                <Button onClick={signout}>Sign Out</Button>
                <Button onClick={sendEmail}>Send Email</Button>
            </div>
        </div>
    );
}

export default Settings;
