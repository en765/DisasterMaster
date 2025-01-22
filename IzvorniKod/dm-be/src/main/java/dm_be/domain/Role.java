package dm_be.domain;

import java.util.*;

import jakarta.persistence.*;

@Entity
public class Role {

    @Id
    @GeneratedValue
    private Long roleId;

    @Column(nullable = false, unique = true)
    private String roleName;

    public Role() {}

    public Long getRoleId() {
        return roleId;
    }

    public void setRoleId(Long roleId) {
        this.roleId = roleId;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    @Override
    public String toString() {
        return "Role{" +
                "roleId='" + roleId + '\'' +
                ", roleName='" + roleName + '\'' +
                '}';
    }


}
