package dm_be.rest;

import dm_be.domain.Government;
import dm_be.dto.GovernmentRequestDTO;
import dm_be.service.GovernmentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/governments")
public class GovernmentController {

    private final GovernmentService governmentService;

    public GovernmentController(GovernmentService governmentService) {
        this.governmentService = governmentService;
    }

    @PostMapping
    public Government createGovernment(@RequestBody GovernmentRequestDTO governmentDTO) {
        return governmentService.createGovernment(governmentDTO);
    }

    @GetMapping("/{id}")
    public Government getGovernmentById(@PathVariable Long id) {
        return governmentService.getGovernmentById(id);
    }

    @GetMapping
    public List<Government> getAllGovernments() {
        return governmentService.getAllGovernments();
    }

    @DeleteMapping("/{id}")
    public void deleteGovernment(@PathVariable Long id) {
        governmentService.deleteGovernment(id);
    }
}
