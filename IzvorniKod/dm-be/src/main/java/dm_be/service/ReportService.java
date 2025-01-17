package dm_be.service;

import java.util.List;

import dm_be.domain.Report;
import dm_be.dto.ReportRequestDTO;

public interface ReportService {
    List<Report> getAllReports();
    Report addReport(ReportRequestDTO reportDTO);
    Report getReportById(Long id);

}
