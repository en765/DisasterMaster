package dm_be.domain;

import jakarta.persistence.*;

@Entity
public class Citizen extends User {

    @Column(name = "firstName")
    private String firstName;

    @Column(name = "lastName")
    private String lastName;

    @Column(name = "isAnonymous")
    private boolean isAnonymous;

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

    @Override
    public String toString() {
        return "Citizen{" +
                "firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", isAnonymous=" + isAnonymous +
                '}';
    }
}
