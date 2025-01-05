package dm_be.dto;

public class GovernmentRequestDTO {

    private Long userId;
    private String govName;

    // Getteri i setteri
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getGovName() {
        return govName;
    }

    public void setGovName(String govName) {
        this.govName = govName;
    }
}
