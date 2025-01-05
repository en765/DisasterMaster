package dm_be.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.JoinColumn;

@Entity
public class HumOrg {

    @Id
    private Long userId;

    private String orgName;

    @OneToOne
    @JoinColumn(name = "userId", referencedColumnName = "userId", nullable = false)
    private Citizen citizen;

    // Getteri i konstruktori
    public HumOrg() {
    }

    public HumOrg(Long userId, String orgName, Citizen citizen) {
        this.userId = userId;
        this.orgName = orgName;
        this.citizen = citizen;
    }

    public Long getUserId() {
        return userId;
    }

    public String getOrgName() {
        return orgName;
    }

    public Citizen getCitizen() {
        return citizen;
    }
}
