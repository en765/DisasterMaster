package dm_be.dto;

public class HumOrgRequestDTO {

    private Long userId;
    private String orgName;

    // Getteri i setteri
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getOrgName() {
        return orgName;
    }

    public void setOrgName(String orgName) {
        this.orgName = orgName;
    }
}
