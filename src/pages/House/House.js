import React from "react";
import Loader from "../../components/Loader/Loader";
import { useState } from "react";
import { useEffect } from "react";
import { db } from "../../utils/firebase";
import { getHouseDetails } from "../../utils/houseQueries";
import Header from "../../components/Header/Header";
import { Typography, List, Button } from "antd";
import {
    InfoCircleOutlined,
    CrownOutlined,
    UserOutlined,
} from "@ant-design/icons";
import "./House.scss";

const { Title, Text } = Typography;

function House() {
    const [loading, setLoading] = useState(false);
    const houseId = window.location.href.split("/")[4];
    const [house, setHouse] = useState({});

    console.log(house);

    useEffect(() => {
        async function fetchData() {
            const houseData = await getHouseDetails(houseId);
            setHouse(houseData);
        }
        fetchData();
    }, [houseId]);

    return (
        <>
            <Header hasBackButton={true} title={house.name} />
            <div className="mainHouseContainer">
                <div className="contentContainer">
                    <div className="memberListContainer">
                        <div className="memberListContentContainer">
                            <List
                                header={
                                    <div className="memberListHeadingContainer">
                                        <Text style={{ fontSize: "1.5em" }}>
                                            Members
                                        </Text>
                                    </div>
                                }
                                dataSource={house.members}
                                renderItem={(item) => (
                                    <List.Item
                                        style={{
                                            backgroundColor: "#fff",
                                            borderRadius: "10px",
                                            marginTop: "10px",
                                        }}
                                        actions={[
                                            <Button
                                                onClick={(e) => {
                                                    navigator(
                                                        `/house/${item.id}`
                                                    );
                                                }}
                                            >
                                                <InfoCircleOutlined />
                                            </Button>,
                                        ]}
                                    >
                                        <Text
                                            style={{
                                                fontSize: "1.1rem",
                                            }}
                                        >
                                            {item.admin ? (
                                                <>
                                                    &nbsp;&nbsp;
                                                    <CrownOutlined />
                                                </>
                                            ) : (
                                                <>
                                                    &nbsp;&nbsp;
                                                    <UserOutlined />
                                                </>
                                            )}
                                            &nbsp;{item.name}
                                        </Text>
                                    </List.Item>
                                )}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default House;
