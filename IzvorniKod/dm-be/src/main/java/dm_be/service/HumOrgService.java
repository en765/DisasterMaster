package dm_be.service;

import dm_be.domain.HumOrg;
import dm_be.dto.HumOrgRequestDTO;

import java.util.List;

public interface HumOrgService {
    HumOrg createHumOrg(HumOrgRequestDTO humOrgDTO);

    HumOrg getHumOrgById(Long id);

    List<HumOrg> getAllHumOrgs();

    void deleteHumOrg(Long id);
}
