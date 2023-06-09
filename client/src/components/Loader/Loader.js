import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

function Loader(size) {
    const antIcon = (
        <LoadingOutlined
            style={{
                fontSize: size,
                margin: "10px",
            }}
            spin
        />
    );
    return <Spin indicator={antIcon} />;
}

export default Loader;
