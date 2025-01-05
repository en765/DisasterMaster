package dm_be.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.JoinColumn;

@Entity
public class Government {

    @Id
    private Long userId;

    private String govName;

    @OneToOne
    @JoinColumn(name = "userId", referencedColumnName = "userId", nullable = false)
    private Citizen citizen;

    // Getteri i konstruktori
    public Government() {
    }

    public Government(Long userId, String govName, Citizen citizen) {
        this.userId = userId;
        this.govName = govName;
        this.citizen = citizen;
    }

    public Long getUserId() {
        return userId;
    }

    public String getGovName() {
        return govName;
    }

    public Citizen getCitizen() {
        return citizen;
    }
}
