import React from "react";
import "./ReportModal.css";

function ReportModal({ report, onClose }) {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h3>Report Details</h3>
                <p><strong>Type:</strong> {report.type}</p>
                <p><strong>Location:</strong> {report.location}</p>
                <p><strong>Description:</strong> {report.description}</p>
                <p><strong>Time:</strong> {report.time}</p>
                {report.image && (
                    <div>
                        <strong>Image:</strong>
                        <img
                            src={report.image}
                            alt={report.type}
                            style={{ maxWidth: "100%", marginTop: "10px" }}
                        />
                    </div>
                )}
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default ReportModal;
