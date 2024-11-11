package dm_be.service.impl;

import dm_be.domain.Government;
import dm_be.domain.Report;
import dm_be.service.GovernmentService;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class GovernmentServiceJPA implements GovernmentService {

    @Override
    public Government createGovernment() {
        return null;
    }

    @Override
    public List<Report> getReports() {
        return List.of();
    }
}