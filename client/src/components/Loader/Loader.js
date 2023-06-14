import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

function Loader(props) {
    const antIcon = (
        <LoadingOutlined
            style={{
                color: props.type === "header" ? "white" : "black",
                fontSize: props.size,
                margin: "10px",
            }}
            spin
        />
    );
    return <Spin indicator={antIcon} />;
}

export default Loader;
