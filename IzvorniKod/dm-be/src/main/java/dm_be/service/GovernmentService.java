package dm_be.service;

import dm_be.domain.Government;
import dm_be.dto.GovernmentRequestDTO;

import java.util.List;

public interface GovernmentService {
    Government createGovernment(GovernmentRequestDTO governmentDTO);

    Government getGovernmentById(Long id);

    List<Government> getAllGovernments();

    void deleteGovernment(Long id);
}
