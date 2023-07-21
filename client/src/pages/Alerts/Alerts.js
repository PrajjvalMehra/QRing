import React from "react";
import "./Alerts.scss";
import { Typography, List, Tabs } from "antd";
import { fetchAlerts, fetchUserInfoById } from "../../utils/userQueries";
import moment from "moment";
import Loader from "../../components/Loader/Loader";
const { Title, Text } = Typography;

function Alerts({ activeKey }) {
    const [todaysAlerts, setTodaysAlerts] = React.useState([]);
    const [alerts, setAlerts] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    React.useEffect(() => {
        console.log("Alerts");
        setLoading(true);
        if (activeKey !== "1") return;
        setAlerts([]);
        setTodaysAlerts([]);
        const uid = JSON.parse(localStorage.getItem("user")).uid;
        async function fetchData() {
            await fetchUserInfoById(uid).then((user) => {
                console.log(user);
                setAlerts(user.alerts);
                const today = moment().startOf("day");
                user.alerts.forEach((alert) => {
                    if (moment(alert.timestamp).isSame(today, "day")) {
                        setTodaysAlerts((prev) => [...prev, alert]);
                    }
                });
            });
        }
        fetchData();

        setLoading(false);
    }, [activeKey]);

    return (
        <div className="alertsMainContainer">
            <div>
                <h1>Alerts {loading && <Loader />}</h1>
            </div>
            <div className="todayAlertsC">
                <List
                    dataSource={todaysAlerts}
                    header={<Text strong="true">Today</Text>}
                    size="small"
                    bordered
                    style={{ backgroundColor: "white" }}
                >
                    {!loading &&
                        todaysAlerts.map((alert) => {
                            return (
                                <List.Item
                                    key={alert.timestamp}
                                    extra={
                                        <Text>
                                            {moment
                                                .utc(alert.timestamp)
                                                .local()
                                                .format("HH:mm A")}
                                        </Text>
                                    }
                                >
                                    <List.Item.Meta
                                        avatar={
                                            alert.type === 0 ? (
                                                <Text
                                                    style={{
                                                        fontSize: "1.5rem",
                                                    }}
                                                >
                                                    👋
                                                </Text>
                                            ) : (
                                                <Text
                                                    style={{
                                                        fontSize: "1.5rem",
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
                <List
                    dataSource={alerts}
                    header={<Text strong="true">All</Text>}
                    size="small"
                    bordered
                    style={{ backgroundColor: "white", marginTop: "20px" }}
                >
                    {!loading &&
                        alerts.map((alert) => {
                            return (
                                <List.Item
                                    key={alert.timestamp}
                                    extra={
                                        <Text>
                                            {moment
                                                .utc(alert.timestamp)
                                                .local()
                                                .format("DD/MM/YY")}
                                        </Text>
                                    }
                                >
                                    <List.Item.Meta
                                        avatar={
                                            alert.type === 0 ? (
                                                <Text
                                                    style={{
                                                        fontSize: "1.5rem",
                                                    }}
                                                >
                                                    👋
                                                </Text>
                                            ) : (
                                                <Text
                                                    style={{
                                                        fontSize: "1.5rem",
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
