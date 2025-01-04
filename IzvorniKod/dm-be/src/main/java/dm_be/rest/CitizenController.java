package dm_be.rest;

import dm_be.domain.Citizen;
import dm_be.dto.CitizenRequestDTO;
//import dm_be.domain.Report;
import dm_be.service.CitizenService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/citizens")
public class CitizenController {

    private final CitizenService citizenService;

    public CitizenController(CitizenService citizenService) {
        this.citizenService = citizenService;
    }

    @PostMapping
    public ResponseEntity<Citizen> createCitizen(@RequestBody CitizenRequestDTO citizenDTO, @RequestParam Long roleId) {
        Citizen createdCitizen = citizenService.createCitizen(citizenDTO, roleId);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCitizen);
    }

    /*
    @PostMapping("/{userId}/reports")
    public ResponseEntity<Report> addReport(@PathVariable Long userId, @RequestParam String description) {
        Report createdReport = citizenService.addReport(userId, description);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdReport);
    }
    */

}
