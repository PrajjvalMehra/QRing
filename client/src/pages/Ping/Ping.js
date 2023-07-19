import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { Button, Typography, Modal, Skeleton, List } from "antd";
import "./Ping.scss";
import { getHouseDetails } from "../../utils/houseQueries";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchUserInfoById } from "../../utils/userQueries";
import axios from "axios";

const { Title, Text } = Typography;
const houseId = window.location.href.split("/")[4];

function Ping() {
    const [house, setHouse] = useState({});
    const [members, setMembers] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [index, setIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        async function fetchData() {
            console.log(houseId);
            const houseData = await getHouseDetails(houseId);
            setHouse(houseData);
            setMembers(houseData.members);
        }
        setLoading(true);
        fetchData();
        console.log(members);
        setLoading(false);
    }, []);

    const onReply = (index) => {
        setIndex(index);
        setModalOpen(true);
    };

    const handleReply = async (uid) => {
        await fetchUserInfoById(uid).then((user) => {
            const { email } = user;
            if (index === 0) {
                console.log("hi");

                axios
                    .post("/ping", {
                        email: email,
                        type: 0,
                    })
                    .then((res) => {
                        console.log(res);
                    });
            } else if (index === 1) {
                console.log("delivering");
            }
            console.log(uid, email);
        });
    };

    return (
        <>
            <Header title={"QRing"} />
            <div className="mainPingContainer">
                <div className="contentHeaderContainer">
                    <Title level={2}>{house.name}</Title>
                </div>
                <div className="replyStackContainer">
                    <div className="replyItemContainer">
                        <Button
                            className="itemButton"
                            onClick={() => {
                                onReply(0);
                            }}
                        >
                            Saying Hi? 👋
                        </Button>
                    </div>
                    <div className="replyItemContainer">
                        <Button
                            className="itemButton"
                            onClick={() => {
                                onReply(1);
                            }}
                        >
                            Delivering Something? 📦
                        </Button>
                    </div>
                </div>
            </div>
            <Modal
                title="Select a member"
                centered
                open={modalOpen}
                onCancel={() => setModalOpen(false)}
                footer={null}
            >
                <div
                    id="scrollableDiv"
                    style={{
                        maxHeight: 200,
                        overflow: "auto",
                        padding: "0 16px",
                    }}
                >
                    {!loading && (
                        <InfiniteScroll
                            dataLength={members.length}
                            loader={
                                <Skeleton
                                    avatar
                                    paragraph={{
                                        rows: 1,
                                    }}
                                    active
                                />
                            }
                            scrollableTarget="scrollableDiv"
                        >
                            <List
                                dataSource={members}
                                renderItem={(item) => (
                                    <List.Item key={item.uid}>
                                        <Button
                                            className="itemButton"
                                            onClick={() => {
                                                handleReply(item.uid);
                                            }}
                                        >
                                            <div>{item.name}</div>
                                        </Button>
                                    </List.Item>
                                )}
                            />
                        </InfiniteScroll>
                    )}
                </div>
            </Modal>
        </>
    );
}

export default Ping;
