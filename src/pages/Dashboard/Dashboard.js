import { Button } from "antd";
import React from "react";
import { logout } from "../../utils/auth";

function Dashboard() {
    const signout = () => {
        logout().then(() => {
            window.location.href = "/";
        });
    };
    return (
        <div>
            <h1>Dashboard</h1>
            <Button type="primary" onClick={signout}>
                Sign Out
            </Button>
        </div>
    );
}

export default Dashboard;
