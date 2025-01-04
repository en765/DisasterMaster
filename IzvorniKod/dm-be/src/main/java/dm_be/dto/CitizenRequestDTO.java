package dm_be.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class CitizenRequestDTO {

    @NotNull
    @Size(min = 3, max = 50)
    private String firstName;

    @NotNull
    @Size(min = 3, max = 50)
    private String lastName;

    private boolean isAnonymous;

    @NotNull
    private String email;

    @NotNull
    @Size(min = 6)
    private String password;

    // Getter i Setter metode

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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "CitizenRequestDTO{" +
                "firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", isAnonymous=" + isAnonymous +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
