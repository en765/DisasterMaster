package dm_be.rest;

import dm_be.domain.Report;
import dm_be.dto.ReportRequestDTO;
import dm_be.service.ReportService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reports")
public class ReportController {
    
    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @PostMapping
    public ResponseEntity<Report> createReport(@RequestBody ReportRequestDTO reportDTO) {
        Report report = reportService.createReport(reportDTO);
        return new ResponseEntity<>(report, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Report>> getAllReports() {
        List<Report> reports = reportService.getAllReports();
        return ResponseEntity.ok(reports);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Report> getReportById(@PathVariable Long id) {
        Report report = reportService.getReportById(id);
        return ResponseEntity.ok(report);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Report> updateReport(@PathVariable Long id, @RequestBody ReportRequestDTO reportDTO) {
        Report updatedReport = reportService.updateReport(id, reportDTO);
        return ResponseEntity.ok(updatedReport);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReport(@PathVariable Long id) {
        reportService.deleteReport(id);
        return ResponseEntity.noContent().build();
    }

}
