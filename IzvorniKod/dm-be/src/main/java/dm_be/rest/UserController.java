package dm_be.rest;

import dm_be.domain.User;
import dm_be.service.UserService;
import dm_be.rest.UserRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

import static org.springframework.web.servlet.function.ServerResponse.ok;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private UserService userService;

   @GetMapping("/")
    public ResponseEntity<List<User>> getAllUsers() {
       return ResponseEntity.ok().body(userService.getAllUsers());
   }
}
