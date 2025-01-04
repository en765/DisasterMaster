package dm_be.domain;

import jakarta.persistence.*;

@Entity
public class Citizen extends AppUser {

    @Column(name = "firstName", nullable = false)
    private String firstName;

    @Column(name = "lastName", nullable = false)
    private String lastName;

    @Column(name = "isAnonymous")
    private boolean isAnonymous;

    /*
    @OneToMany(mappedBy = "citizen", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Report> reports = new ArrayList<>();  
     */

    public Citizen() {};

    public Citizen(String firstName, String lastName, boolean isAnonymous) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.isAnonymous = isAnonymous;
    }

    public Citizen(Long userId, Role role, String email, String password, String firstName, String lastName, boolean isAnonymous) {
        super(userId, role, email, password);
        this.firstName = firstName;
        this.lastName = lastName;
        this.isAnonymous = isAnonymous;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public boolean isAnonymous() {
        return isAnonymous;
    }

    public void setAnonymous(boolean anonymous) {
        isAnonymous = anonymous;
    }

    /*
    public List<Report> getReports() {
        return reports;
    }

    public void addReport(Report report) {
        reports.add(report);
        report.setCitizen(this);
    }

    public void removeReport(Report report) {
        reports.remove(report);
        report.setCitizen(null);
    }
     */

    @Override
    public String toString() {
        return "Citizen{" +
                "firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", isAnonymous=" + isAnonymous +
                '}';
    }
}
