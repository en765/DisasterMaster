package dm_be.domain;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Photo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long photoId;

    @Column(nullable = false)
    private String photoURL;

    @Column(nullable = false)
    private LocalDateTime uploadedAt;

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private Citizen citizen;

    @ManyToOne
    @JoinColumn(name = "reportId")
    private Report report;

    public Photo() {}

    public Photo(String photoURL, LocalDateTime uploadedAt, Citizen citizen, Report report) {
        this.photoURL = photoURL;
        this.uploadedAt = uploadedAt;
        this.citizen = citizen;
        this.report = report;
    }

    // Getteri i setteri

    public Long getPhotoId() {
        return photoId;
    }

    public void setPhotoId(Long photoId) {
        this.photoId = photoId;
    }

    public String getPhotoURL() {
        return photoURL;
    }

    public void setPhotoURL(String photoURL) {
        this.photoURL = photoURL;
    }

    public LocalDateTime getUploadedAt() {
        return uploadedAt;
    }

    public void setUploadedAt(LocalDateTime uploadedAt) {
        this.uploadedAt = uploadedAt;
    }

    public Citizen getCitizen() {
        return citizen;
    }

    public void setCitizen(Citizen citizen) {
        this.citizen = citizen;
    }

    public Report getReport() {
        return report;
    }

    public void setReport(Report report) {
        this.report = report;
    }
}
