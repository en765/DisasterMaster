package dm_be.rest;

import dm_be.domain.HumOrg;
import dm_be.dto.HumOrgRequestDTO;
import dm_be.service.HumOrgService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/humorgs")
public class HumOrgController {

    private final HumOrgService humOrgService;

    public HumOrgController(HumOrgService humOrgService) {
        this.humOrgService = humOrgService;
    }

    @PostMapping
    public HumOrg createHumOrg(@RequestBody HumOrgRequestDTO humOrgDTO) {
        return humOrgService.createHumOrg(humOrgDTO);
    }

    @GetMapping("/{id}")
    public HumOrg getHumOrgById(@PathVariable Long id) {
        return humOrgService.getHumOrgById(id);
    }

    @GetMapping
    public List<HumOrg> getAllHumOrgs() {
        return humOrgService.getAllHumOrgs();
    }

    @DeleteMapping("/{id}")
    public void deleteHumOrg(@PathVariable Long id) {
        humOrgService.deleteHumOrg(id);
    }
}
