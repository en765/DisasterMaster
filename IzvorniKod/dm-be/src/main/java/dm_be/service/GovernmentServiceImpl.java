package dm_be.service;

import dm_be.dao.CitizenRepository;
import dm_be.dao.GovernmentRepository;
import dm_be.domain.Citizen;
import dm_be.domain.Government;
import dm_be.dto.GovernmentRequestDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GovernmentServiceImpl implements GovernmentService {

    private final GovernmentRepository governmentRepo;
    private final CitizenRepository citizenRepo;

    public GovernmentServiceImpl(GovernmentRepository governmentRepo, CitizenRepository citizenRepo) {
        this.governmentRepo = governmentRepo;
        this.citizenRepo = citizenRepo;
    }

    @Override
    public Government createGovernment(GovernmentRequestDTO governmentDTO) {
        Citizen citizen = citizenRepo.findById(governmentDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("Citizen not found"));

        Government government = new Government(governmentDTO.getUserId(), governmentDTO.getGovName(), citizen);

        return governmentRepo.save(government);
    }

    @Override
    public Government getGovernmentById(Long id) {
        return governmentRepo.findById(id).orElseThrow(() -> new RuntimeException("Government not found"));
    }

    @Override
    public List<Government> getAllGovernments() {
        return governmentRepo.findAll();
    }

    @Override
    public void deleteGovernment(Long id) {
        governmentRepo.deleteById(id);
    }
}
