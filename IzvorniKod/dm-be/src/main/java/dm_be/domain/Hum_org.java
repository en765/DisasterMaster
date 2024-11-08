package dm_be.domain;

import jakarta.persistence.*;

@Entity
public class Hum_org extends User {

    @Column(name = "hum_orgName")
    private String hum_orgName;


    public String getHum_orgName() {
        return hum_orgName;
    }

    public void setHum_orgName(String hum_orgName) {
        this.hum_orgName = hum_orgName;
    }


    @Override
    public String toString() {
        return "hum_org{" +
                "hum_orgName='" + hum_orgName + '\'' +
                '}';
    }
}