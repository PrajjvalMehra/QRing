import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ConfigProvider } from "antd";
import "../src/utils/firebase";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
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
