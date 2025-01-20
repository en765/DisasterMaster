package dm_be.dto;

public class AppUserRequestDTO {
    private String username;
    private String password;
    private String email;
    private Long roleId;
    private Boolean isSubscribed;

    public AppUserRequestDTO() {}

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getRoleId() {
        return roleId;
    }

    public void setRoleId(Long roleId) { this.roleId = roleId; }

    public boolean isSubscribed() { return isSubscribed; }

    public void setSubscribed(boolean isSubscribed) { this.isSubscribed = isSubscribed; }
}
