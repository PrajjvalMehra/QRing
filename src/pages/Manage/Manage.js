import React from "react";
import "./Manage.scss";
import { Button, Row, Typography, Col, List } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Divider, Skeleton } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { getHouseList } from "../../utils/userQueries";
import {
    UserOutlined,
    CrownOutlined,
    InfoCircleOutlined,
} from "@ant-design/icons";
import Loader from "../../components/Loader/Loader";

const { Text, Title } = Typography;
function Manage() {
    const navigator = useNavigate();
    const [houseList, setHouseList] = React.useState([]);

    const gotoAddHouse = () => {
        navigator("/addhouse");
    };
    React.useEffect(() => {
        const data = getHouseList();
        data.then((res) => {
            console.log(res);
            setHouseList(res);
        });
    }, []);

    return (
        <div className="pageBG">
            <div className="tabContainer">
                <h1>Manage</h1>
                <div>
                    <Row>
                        <Col>
                            <h2>Houses</h2>
                        </Col>
                        <Col>
                            <Button type="text" onClick={gotoAddHouse}>
                                <PlusOutlined />
                            </Button>
                        </Col>
                    </Row>
                    <div className="houseListContainer">
                        <Row>
                            <Col span={24}>
                                <InfiniteScroll
                                    dataLength={houseList.length}
                                    height="calc(100vh - 375px)"
                                    loader={<Loader />}
                                    scrollableTarget="scrollableDiv"
                                >
                                    <List
                                        dataSource={houseList}
                                        renderItem={(item) => (
                                            <List.Item
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
                                                        <CrownOutlined />
                                                    ) : (
                                                        <UserOutlined />
                                                    )}
                                                    &nbsp;{item.name}
                                                </Text>
                                            </List.Item>
                                        )}
                                    />
                                </InfiniteScroll>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Manage;
