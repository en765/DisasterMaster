package dm_be.login;

import org.springframework.stereotype.Service;

@Service
public class UserService {
    public boolean validateUser(String username, String password) {
        return "user".equals(username) && "password".equals(password);
    }
}
