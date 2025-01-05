package dm_be.domain;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Report {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reportId;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private Citizen citizen;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DisasterType disasterType;

    @Column(nullable = false)
    private boolean status;
    
    @ManyToOne
    @JoinColumn(name = "locationId", nullable = false)
    private Location location;

    @ManyToOne
    @JoinColumn(name = "photoId", nullable = true)
    private Photo photo; 

    public Report () {};

    public Report(Citizen citizen2, DisasterType disasterType2, boolean status2, Location location2,
            String descriptionOfDisaster, LocalDateTime createdAt2, Photo photo2) {
        //TODO Auto-generated constructor stub
    }

    // Getteri i setteri
    public Long getReportId() {
        return reportId;
    }

    public void setReportId(Long reportId) {
        this.reportId = reportId;
    }

    public Citizen getCitizen() {
        return citizen;
    }

    public void setCitizen(Citizen citizen) {
        this.citizen = citizen;
    }

    public DisasterType getDisasterType() {
        return disasterType;
    }

    public void setDisasterType(DisasterType disasterType) {
        this.disasterType = disasterType;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }
    
    public String getDescriptionOfDisaster() {
        return description;
    }

    public void setDescriptionOfDisaster(String description) {
        this.description = description;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    @Override
    public String toString() {
        return "Report{" +
                "reportId=" + reportId +
                ", citizen=" + (citizen != null ? citizen.getUserId() : "null") +
                ", disasterType=" + disasterType +
                ", status=" + status +
                ", location=" + (location != null ? location.getLocationId() : "null") +
                ", descriptionOfDisaster='" + description + '\'' +
                ", createdAt=" + createdAt +
                ", photo=" + (photo != null ? photo.getPhotoId() : "null") +
                '}';
    }

    public Location getLocation() {
        return location;
    }
    
    public void setLocation(Location location) {
        this.location = location;
    }
    
    public Photo getPhoto() {
        return photo;
    }
    
    public void setPhoto(Photo photo) {
        this.photo = photo;
    }
    
    
}
