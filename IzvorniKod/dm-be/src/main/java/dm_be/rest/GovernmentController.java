package dm_be.rest;

import dm_be.service.GovernmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "api/users/gov")
public class GovernmentController {

    private final GovernmentService governmentService;

    @Autowired
    public GovernmentController(GovernmentService governmentService) {
        this.governmentService = governmentService;
    }

}