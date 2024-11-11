package dm_be.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;

@Entity
public class HumanitarianOrganisation {//extends AppUser{

    @Column(name = "orgName") //nullable = false?
    private String orgName;

    public HumanitarianOrganisation(String orgName) {
        this.orgName = orgName;
    }

    public String getOrgName() {
        return orgName;
    }

    public void setOrgName(String orgName) {
        this.orgName = orgName;
    }

    @Override
    public String toString() {
        return "HumanitarianOrganisation{" +
                "orgName='" + orgName + '\'' +
                '}';
    }
}