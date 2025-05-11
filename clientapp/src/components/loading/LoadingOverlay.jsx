import React from "react";
import { Spinner } from "react-bootstrap";
import "./LoadingOverlay.css"; // nhớ tạo file CSS này

export default function LoadingOverlay({ fullscreen = false }) {
    return (
        <div className={`loading-overlay d-flex justify-content-center align-items-center ${fullscreen ? "fullscreen" : ""}`}>
            <Spinner animation="border" variant="primary" />
        </div>
    );
}
