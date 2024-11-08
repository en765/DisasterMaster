package dm_be.rest;

public class UserRequestDTO {

    private String userType;
    private String userId;
    private String email;
    private String password;
    private String role;

    // Specifični atributi za Citizen
    private String firstName;
    private String lastName;
    private Boolean isAnonymous;

    // Specifični atributi za HumOrg
    private String organizationName;

    // Specifični atributi za Government
    private String governmentName;

    // Getteri i setteri
    // ...
}
