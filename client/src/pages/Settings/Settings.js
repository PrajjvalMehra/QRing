import React from "react";
import { logout } from "../../utils/auth";
import { Button, Divider, List, Row } from "antd";
import { useNavigate } from "react-router-dom";
import {
    disableAppNotifications,
    fetchUserInfoById,
} from "../../utils/userQueries";
import { Typography } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import "./Settings.scss";
import { Switch } from "antd";
import { handleNotifyToken } from "../../fcm/setup";
const { Text, Title } = Typography;

function Settings() {
    const navigate = useNavigate();
    const [name, setName] = React.useState({});
    const [isNotificationEnabled, setIsNotificationEnabled] =
        React.useState(false);
    const signout = () => {
        logout().then(() => {
            localStorage.removeItem("uid");
            navigate("/");
        });
    };

    const onNotificationToggle = (checked) => {
        console.log(`switch to ${checked}`);
        if (checked) {
            Notification.requestPermission().then(function (permission) {
                if (permission === "granted") {
                    console.log("Notification permission granted.");
                    setIsNotificationEnabled(true);
                } else {
                    console.log("Unable to get permission to notify.");
                }
            });
        } else {
            disableAppNotifications(
                JSON.parse(localStorage.getItem("user")).uid
            );
        }
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

    React.useEffect(() => {
        if (Notification.permission === "granted") {
            setIsNotificationEnabled(true);
        }
    }, []);

    return (
        <div className="pageBG">
            <div className="tabContainer">
                <h1>Settings</h1>
                <Text strong="true">👤 {name.name}</Text>
                <br />
                <Text strong="true">📥 {name.email}</Text>
                <div className="notificationContainer">
                    <List
                        header={<Text strong="true">Notifications</Text>}
                        size="small"
                        bordered
                        style={{ backgroundColor: "white" }}
                        // dataSource={data}
                    >
                        <List.Item>
                            <div className="settingsListItem">
                                <Text>App Noitifications</Text>
                                <Switch
                                    checked={isNotificationEnabled}
                                    onChange={onNotificationToggle}
                                ></Switch>
                            </div>
                        </List.Item>
                    </List>
                </div>

                <Button className="signOutButton" onClick={signout}>
                    Sign Out
                </Button>
            </div>
        </div>
    );
}

export default Settings;
