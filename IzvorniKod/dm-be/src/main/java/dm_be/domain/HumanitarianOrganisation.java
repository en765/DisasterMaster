package dm_be.domain;

import jakarta.persistence.Column;
import jakarta.persistence.*;

@Entity
class HumanitarianOrganisation extends AppUser {
    @Column(name = "orgName") //nullable = false?
    private String orgName;

    public HumanitarianOrganisation(String orgName) {
        this.orgName = orgName;
    }

    public HumanitarianOrganisation() {}

    public String getOrgName() {
        return orgName;
    }

    public void setOrgName(String orgName) {
        this.orgName = orgName;
    }
}


