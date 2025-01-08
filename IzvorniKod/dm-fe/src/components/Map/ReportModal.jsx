import React from "react";
import "./ReportModal.css";

function ReportModal({ report, onClose }) {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h3>Report Details</h3>
                <p><strong>Location:</strong> {report.location}</p>
                <p><strong>Description:</strong> {report.description}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default ReportModal;
