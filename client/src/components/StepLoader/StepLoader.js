import React, { useEffect, useState } from "react";
import "./StepLoader.scss";

const StepLoader = ({ progress, step }) => {
    const [offset, setOffset] = useState(0);

    const size = 35;
    const trackWidth = 4;
    const trackColor = `#ddd`;
    const indicatorWidth = 4;
    const indicatorColor = `black`;
    // const indicatorCap = `round`;

    const central = size / 2;
    const radius = size / 2 - trackWidth / 2;
    const circumference = 2 * Math.PI * radius;

    // The strokeDashoffset property represents the location along an SVG path where the dash of a dash pattern will end.
    // By changing this value, we can control how much of the path is visible.
    useEffect(() => {
        const progressOffset = ((100 - progress) / 100) * circumference;
        setOffset(progressOffset);
    }, [progress, circumference]);

    return (
        <div className="progress-circle-container">
            <svg className="progress-circle-svg" width={size} height={size}>
                <circle
                    className="progress-circle-svg-circle-bg"
                    stroke={trackColor}
                    cx={central}
                    cy={central}
                    r={radius}
                    fill="none"
                    strokeWidth={trackWidth}
                />

                <circle
                    className="progress-circle-svg-circle"
                    stroke={indicatorColor}
                    cx={central}
                    fill="none"
                    cy={central}
                    r={radius}
                    strokeWidth={indicatorWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                />
            </svg>
        </div>
    );
};

export default StepLoader;
