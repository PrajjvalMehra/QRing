import React from "react";
import { logout } from "../../utils/auth";
import { Button, Row } from "antd";

function Settings() {
    const signout = () => {
        logout().then(() => {
            window.location.href = "/";
        });
    };

    return (
        <div className="pageBG">
            <div className="tabContainer">
                <h1>Settings</h1>
                <Button onClick={signout}>Sign Out</Button>
            </div>
        </div>
    );
}

export default Settings;
