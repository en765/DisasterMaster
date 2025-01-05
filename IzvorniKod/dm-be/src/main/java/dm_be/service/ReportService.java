package dm_be.service;

import dm_be.domain.Report;
import dm_be.dto.ReportRequestDTO;
import java.util.*;

public interface ReportService {
    Report createReport(ReportRequestDTO reportDTO);

    List<Report> getAllReports();

    Report getReportById(Long id);

    Report updateReport(Long id, ReportRequestDTO reportDTO);

    void deleteReport(Long id);
}