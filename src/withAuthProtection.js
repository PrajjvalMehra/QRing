// src/withAuthProtection.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const withAuthProtection = (Component) => {
    return (props) => {
        const navigate = useNavigate();
        const isAuthenticated = localStorage.getItem("user");

        useEffect(() => {
            if (!isAuthenticated) {
                navigate("/");
            }
        }, [isAuthenticated, navigate]);

        return isAuthenticated ? <Component {...props} /> : null;
    };
};

export default withAuthProtection;
