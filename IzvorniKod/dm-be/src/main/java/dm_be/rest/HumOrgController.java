package dm_be.rest;

import dm_be.service.HumOrgService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "api/users/humorg")
public class HumOrgController {

    private final HumOrgService humOrgService;

    @Autowired
    public HumOrgController(HumOrgService humOrgService) {
        this.humOrgService = humOrgService;
    }
}
