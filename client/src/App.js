import "./App.scss";
import { Navigate, useLocation } from "react-router-dom";

import React, { useEffect } from "react";

function App() {
    useEffect(() => {
        window.addEventListener("offline", () => {
            navigate("/nointernet");
        });
    }, []);
    const location = useLocation();
    const navigate = Navigate();

    return <></>;
}

export default App;
