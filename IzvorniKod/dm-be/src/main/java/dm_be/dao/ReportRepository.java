package dm_be.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import dm_be.domain.Report;

public interface ReportRepository extends JpaRepository<Report, Long> {
    Report findByReportId(Long id);
}
