package dm_be.dto;

import java.time.LocalDateTime;

import dm_be.domain.DisasterType;
import jakarta.validation.constraints.NotNull;

public class ReportRequestDTO {
    
    private Long userId;
    @NotNull
    private DisasterType disasterType;

    @NotNull
    private String location;

    private String description;

    @NotNull
    private LocalDateTime createdAt;

    private String photo;

    
    public Long getUserId() {
        return userId;
    }
    
    public void setUserId(Long userId) {
        this.userId = userId;
    }


    
    public DisasterType getDisasterType() {
        return disasterType;
    }

    public void setDisasterType(DisasterType disasterType) {
        this.disasterType = disasterType;
    }


    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

}
