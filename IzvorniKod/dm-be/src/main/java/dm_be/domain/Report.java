package dm_be.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;

@Entity
public class Report{

    public enum DisasterType{
        POŽAR, POPLAVA, POTRES //eng? koje jos dodati?
    }

    @Column(name = "reportId", nullable = false)
    private String reportId;

    @Column(name = "userId", nullable = false)
    private String userId;

    @Column(name = "disasterType", nullable = false)
    private DisasterType disasterType;

    @Column(name = "locationId", nullable = false)
    private String locationId;

    @Column(name = "status", nullable = false)
    private String status; // da i ovo bude enum?

    public Report(String reportId, String userId, DisasterType disasterType, String locationId, String status) {
        this.reportId = reportId;
        this.userId = userId;
        this.disasterType = disasterType;
        this.locationId = locationId;
        this.status = status;
    }

    public String getReportId() {
        return reportId;
    }

    public void setReportId(String reportId) {
        this.reportId = reportId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public DisasterType getDisasterType() {
        return disasterType;
    }

    public void setDisasterType(DisasterType disasterType) {
        this.disasterType = disasterType;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getLocationId() {
        return locationId;
    }

    public void setLocationId(String locationId) {
        this.locationId = locationId;
    }

}