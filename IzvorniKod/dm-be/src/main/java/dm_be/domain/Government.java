package dm_be.domain;

import jakarta.persistence.*;

@Entity
public class Government extends User {

    @Column(name = "govName")
    private String govName;


    public String getGovName() {
        return govName;
    }

    public void setGovName(String govName) {
        this.govName = govName;
    }


    @Override
    public String toString() {
        return "Governmet{" +
                "govName='" + govName + '\'' +
                '}';
    }
}