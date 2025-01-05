package dm_be.service;

import dm_be.dao.CitizenRepository;
import dm_be.dao.RoleRepository;
import dm_be.domain.Citizen;
//import dm_be.domain.Report;
import dm_be.domain.Role;
import dm_be.service.CitizenService;
import dm_be.dto.CitizenRequestDTO;
//import dm_be.service.ReportService;
import org.springframework.stereotype.Service;

@Service
public class CitizenServiceImpl implements CitizenService {

    private final CitizenRepository citizenRepo;
    private final RoleRepository roleRepo;
    //private final ReportService reportService;

    public CitizenServiceImpl(CitizenRepository citizenRepo, RoleRepository roleRepo/*, ReportService reportService*/) {
        this.citizenRepo = citizenRepo;
        this.roleRepo = roleRepo;
        //this.reportService = reportService;
    }

    @Override
    public Citizen createCitizen(CitizenRequestDTO citizenDTO, Long roleId) {
        // Dohvati odgovarajući role
        Role role = roleRepo.findById(roleId)
                .orElseThrow(() -> new IllegalArgumentException("Role not found"));

        // Mapiraj CitizenRequestDTO u Citizen entitet
        Citizen citizen = new Citizen(
                null, // userId se generira automatski u bazi
                role,
                citizenDTO.getEmail(),
                citizenDTO.getPassword(),
                citizenDTO.getFirstName(),
                citizenDTO.getLastName(),
                citizenDTO.isAnonymous()
        );

        // Spremi Citizen entitet u bazu
        return citizenRepo.save(citizen);
    }

    /* 
    @Override
    public Report addReport(Long userId, String description) {
        return reportService.addReport(userId, description)
    }
    */
    
}
