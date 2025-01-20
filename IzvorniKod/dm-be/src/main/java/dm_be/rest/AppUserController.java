package dm_be.rest;


import dm_be.service.AppUserService;
import dm_be.domain.AppUser;
import dm_be.dto.AppUserRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("/users")
public class AppUserController {

    @Autowired
    private AppUserService appUserService;

    //@PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/")
    public List<AppUser> getAllUsers() {
        return appUserService.getAllUsers();
    }

    @PostMapping("/register")
    public ResponseEntity<AppUser> addAppUser(@RequestBody AppUserRequestDTO appUser) {
        AppUser createdUser = appUserService.addAppUser(appUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }

    /**
     * Endpoint to subscribe a user.
     * Expects a JSON object with userId:
     * {
     *    "userId": 1
     * }
     */
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @PostMapping("/subscribe")
    public ResponseEntity<?> subscribeUser(@RequestBody SubscribeRequest request) {
        try {
            AppUser updatedUser = appUserService.subscribeUser(request.getUserId());
            return ResponseEntity.ok(updatedUser);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    public static class SubscribeRequest {
        private Long userId;

        public Long getUserId() {
            return userId;
        }

        public void setUserId(Long userId) {
            this.userId = userId;
        }
    }
}
