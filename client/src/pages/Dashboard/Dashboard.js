import { Button, Col, Row, Tabs } from "antd";
import React from "react";
import { logout } from "../../utils/auth";
import Header from "../../components/Header/Header";
import Alerts from "../Alerts/Alerts";
import { BellOutlined, SettingOutlined, HomeOutlined } from "@ant-design/icons";
import Settings from "../Settings/Settings";
import Manage from "../Manage/Manage";

function Dashboard() {
    const onChange = (key) => {};
    console.log("Dashboard");

    const items = [
        {
            key: "1",
            label: (
                <div
                    style={{
                        width: "100%",
                    }}
                >
                    <BellOutlined />
                    Alerts
                </div>
            ),
            children: <Alerts />,
        },
        {
            key: "2",
            label: (
                <div
                    style={{
                        width: "100%",
                    }}
                >
                    <HomeOutlined />
                    Manage
                </div>
            ),
            children: <Manage />,
        },
        {
            key: "3",
            label: (
                <div
                    style={{
                        width: "100%",
                    }}
                >
                    <SettingOutlined />
                    Settings
                </div>
            ),
            children: <Settings />,
        },
    ];
    return (
        <>
            <Header title={"QRing"} />
            <div>
                <Tabs
                    defaultActiveKey="1"
                    tabPosition="bottom"
                    items={items}
                    onChange={onChange}
                    size="large"
                    centered
                    tabBarStyle={{
                        zIndex: 1,
                        position: "fixed",
                        bottom: 0,
                        width: "100vw",
                        backgroundColor: "white",
                        paddingBottom: "20px",
                    }}
                />
            </div>
        </>
    );
}

export default Dashboard;
