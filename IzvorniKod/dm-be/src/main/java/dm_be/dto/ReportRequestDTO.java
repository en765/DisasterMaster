package dm_be.dto;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public class ReportRequestDTO {

    @NotNull
    private Long citizenId;

    @NotNull
    private String disasterType; // Prosljeđuje se kao string (npr. "FLOOD")

    private boolean status;

    @NotNull
    private Long locationId;

    @NotNull
    private String descriptionOfDisaster;

    private Long photoId;

    private LocalDateTime createdAt = LocalDateTime.now(); // Default vrijeme

    // Getteri i setteri
    public Long getCitizenId() {
        return citizenId;
    }

    public void setCitizenId(Long citizenId) {
        this.citizenId = citizenId;
    }

    public String getDisasterType() {
        return disasterType;
    }

    public void setDisasterType(String disasterType) {
        this.disasterType = disasterType;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public Long getLocationId() {
        return locationId;
    }

    public void setLocationId(Long locationId) {
        this.locationId = locationId;
    }

    public String getDescriptionOfDisaster() {
        return descriptionOfDisaster;
    }

    public void setDescriptionOfDisaster(String descriptionOfDisaster) {
        this.descriptionOfDisaster = descriptionOfDisaster;
    }

    public Long getPhotoId() {
        return photoId;
    }

    public void setPhotoId(Long photoId) {
        this.photoId = photoId;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}