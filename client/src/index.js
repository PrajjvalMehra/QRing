import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ConfigProvider } from "antd";
import "../src/utils/firebase";
import Dashboard from "./pages/Dashboard/Dashboard";
import AddHouse from "./pages/AddHouse/AddHouse";
import House from "./pages/House/House";
import "./App";
import withAuthProtection from "./withAuthProtection";
import Invite from "./pages/Invite/Invite";
import NoInternet from "./pages/NoInternet/NoInternet";

const ProtectedDashboard = withAuthProtection(Dashboard);
const ProtectedAddHouse = withAuthProtection(AddHouse);

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/dashboard",
        element: <ProtectedDashboard />,
    },
    {
        path: "/addhouse",
        element: <ProtectedAddHouse />,
    },
    {
        path: "/house/:id",
        element: <House />,
    },
    {
        path: "/invite",
        element: <Invite />,
    },
    {
        path: "/offline",
        element: <NoInternet />,
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <ConfigProvider
        theme={{
            token: {
                colorPrimary: "black",
            },
        }}
    >
        <RouterProvider router={router} />
    </ConfigProvider>
);
