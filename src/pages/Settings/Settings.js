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
            console.log(data);
            setName(data);
        }
        getName();
    }, []);

    return (
        <div className="pageBG">
            <div className="tabContainer">
                <h1>Settings</h1>
                <Title level={4}>{name.name}</Title>
                <Title level={5}>{name.email}</Title>
                <Button onClick={signout}>Sign Out</Button>
            </div>
        </div>
    );
}

export default Settings;
