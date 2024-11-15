package dm_be.service;

import dm_be.domain.Government;
import dm_be.domain.Report;

import java.util.List;

public interface GovernmentService {

    Government createGovernment();
    List<Report> getReports();


}
