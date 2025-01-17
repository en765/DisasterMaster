package dm_be.rest;

import java.util.List;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dm_be.domain.Report;
import dm_be.dto.ReportRequestDTO;
import dm_be.service.ReportService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/reports")
public class ReportController {
    
    @Autowired
    private ReportService reportService;
    
    @GetMapping("/")
    public List<Report> getAllReports() {
        return reportService.getAllReports();
    }

    @PostMapping("/add")
    public ResponseEntity<Report> addReport(@RequestBody ReportRequestDTO reportDTO) {
        try {
            Report createdReport = reportService.addReport(reportDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdReport);
        } catch (Exception e) {
            e.printStackTrace(); 
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
