import React from "react";
import "./Manage.scss";
import { Typography } from "antd";
const { Text, Title } = Typography;

function Manage() {
    return (
        <div className="pageBG">
            <div className="tabContainer">
                <h1>Manage</h1>
                <Title level={4}>Houses</Title>
            </div>
        </div>
    );
}

export default Manage;
