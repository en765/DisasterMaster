package dm_be.rest;

import dm_be.domain.AppUser;
import dm_be.domain.Citizen;
import dm_be.dto.AppUserRequestDTO;
import dm_be.service.AppUserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class AppUserController {

    private final AppUserService appUserService;

    public AppUserController(AppUserService appUserService) {
        this.appUserService = appUserService;
    }

    @PostMapping("/citizen")
    public ResponseEntity<Citizen> createCitizen(@RequestBody @Valid AppUserRequestDTO userRequestDTO) {
        Citizen citizen = new Citizen();
        citizen.setEmail(userRequestDTO.getEmail());
        citizen.setPassword(userRequestDTO.getPassword());
        Citizen createdCitizen = (Citizen) appUserService.createUser(citizen, userRequestDTO.getRoleId());
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCitizen);
    }
}
