package dm_be.rest;

import dm_be.service.HumOrgService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "humorg")
public class HumOrgController {

    private HumOrgService humOrgService;

    public HumOrgController(HumOrgService humOrgService) {
        this.humOrgService = humOrgService;
    }
}
