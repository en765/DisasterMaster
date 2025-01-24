package dm_be.rest;

import java.util.List;

import dm_be.domain.DisasterType;
import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

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


    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("https://disastermaster.onrender.com") // Frontend URL
                        .allowedMethods("GET", "POST", "PUT", "DELETE")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
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

    /*@PostMapping("/add")
    public ResponseEntity<Report> addReport(@RequestParam("disasterType") String disasterType,
                                            @RequestParam("location") String location,
                                            @RequestParam("description") String description,
                                            @RequestParam(value = "photo", required = false) MultipartFile photo) {
        try {
            ReportRequestDTO reportDTO = new ReportRequestDTO();
            reportDTO.setDisasterType(DisasterType.valueOf(disasterType.toUpperCase()));
            reportDTO.setLocation(location);
            if(description != null) reportDTO.setDescription(description);
            //ignoriram sliku za sad
            Report createdReport = reportService.addReport(reportDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdReport);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }*/

}
