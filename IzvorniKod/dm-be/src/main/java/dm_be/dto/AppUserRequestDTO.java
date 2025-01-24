package dm_be.dto;

public class AppUserRequestDTO {
    private String username;
    private String password;
    private String email;
    private Long roleId;
    private boolean subbed;

    public boolean getSubbed() {
        return subbed;
    }

    public void setSubbed(boolean subbed) {
        this.subbed = subbed;
    }

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

    public void setRoleId(Long roleId) {
        this.roleId = roleId;
    }
}
