package dm_be.service;

import dm_be.dao.CitizenRepository;
import dm_be.dao.HumOrgRepository;
import dm_be.domain.Citizen;
import dm_be.domain.HumOrg;
import dm_be.dto.HumOrgRequestDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HumOrgServiceImpl implements HumOrgService {

    private final HumOrgRepository humOrgRepo;
    private final CitizenRepository citizenRepo;

    public HumOrgServiceImpl(HumOrgRepository humOrgRepo, CitizenRepository citizenRepo) {
        this.humOrgRepo = humOrgRepo;
        this.citizenRepo = citizenRepo;
    }

    @Override
    public HumOrg createHumOrg(HumOrgRequestDTO humOrgDTO) {
        Citizen citizen = citizenRepo.findById(humOrgDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("Citizen not found"));

        HumOrg humOrg = new HumOrg(humOrgDTO.getUserId(), humOrgDTO.getOrgName(), citizen);

        return humOrgRepo.save(humOrg);
    }

    @Override
    public HumOrg getHumOrgById(Long id) {
        return humOrgRepo.findById(id).orElseThrow(() -> new RuntimeException("Humanitarian Organization not found"));
    }

    @Override
    public List<HumOrg> getAllHumOrgs() {
        return humOrgRepo.findAll();
    }

    @Override
    public void deleteHumOrg(Long id) {
        humOrgRepo.deleteById(id);
    }
}
