import React from "react";
import "./Alerts.scss";
import { Typography, List, Tabs } from "antd";
import { fetchAlerts, fetchUserInfoById } from "../../utils/userQueries";
import moment from "moment";
const { Title, Text } = Typography;

function Alerts() {
    const [todaysAlerts, setTodaysAlerts] = React.useState([]);
    const [alerts, setAlerts] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    React.useEffect(() => {
        setLoading(true);
        console.log("Alerts");
        const uid = JSON.parse(localStorage.getItem("user")).uid;
        async function fetchData() {
            await fetchUserInfoById(uid).then((user) => {
                console.log(user);
                setAlerts(user.alerts);
            });
        }
        fetchData();
        setLoading(false);
    }, []);

    return (
        <div className="alertsMainContainer">
            <div>
                <h1>Alerts</h1>
            </div>
            <div className="todayAlertsC">
                <List
                    header={<Text strong="true">Today</Text>}
                    size="small"
                    bordered
                    style={{ backgroundColor: "white" }}
                >
                    {!loading &&
                        alerts.map((alert) => {
                            return (
                                <List.Item key={alert.timestamp}>
                                    <List.Item.Meta
                                        avatar={
                                            alert.type === 0 ? (
                                                <Text
                                                    style={{
                                                        fontSize: "1.8rem",
                                                    }}
                                                >
                                                    👋
                                                </Text>
                                            ) : (
                                                <Text
                                                    style={{
                                                        fontSize: "1.8rem",
                                                    }}
                                                >
                                                    📦
                                                </Text>
                                            )
                                        }
                                        description={alert.houseName}
                                        title={
                                            alert.type === 0
                                                ? "Someone is at the door!"
                                                : "You have a delivery!"
                                        }
                                    />
                                </List.Item>
                            );
                        })}
                </List>
            </div>
        </div>
    );
}

export default Alerts;
