package dm_be.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;

@Entity
class Government extends AppUser{

    @Column(name = "govName") //nullable = false?
    private String govName;

    public Government(String govName) {
        this.govName = govName;
    }

    public String getGovName() {
        return govName;
    }

    public void setGovName(String govName) {
        this.govName = govName;
    }


}
