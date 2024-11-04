package dm_be.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "dm/gov")
public class GovernmentController {

    /*private final GovernmentService govserv;
    @Autowired
    public GovernmentController(GovernmentService govserv) {
        this.govserv = govserv;
    }*/

    /*@GetMapping
    public List<Report> getReports() {
        -npr. za prikaz prijava
        return govserv.getReports()
    }*/
}
