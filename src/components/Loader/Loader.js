import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
const antIcon = (
    <LoadingOutlined
        style={{
            fontSize: 48,
        }}
        spin
    />
);

function Loader() {
    return <Spin indicator={antIcon} />;
}

export default Loader;
