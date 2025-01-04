package dm_be.service;

import dm_be.domain.Citizen;
import dm_be.dto.CitizenRequestDTO;
//import dm_be.domain.Report;


public interface CitizenService {
    Citizen createCitizen(CitizenRequestDTO citizenDTO, Long roleId);
    //Report addReport(Long userId, String description);
}
