package dm_be.service;

import dm_be.domain.*;
import dm_be.dao.*;
import dm_be.dto.ReportRequestDTO;
import dm_be.service.ReportService;
import org.springframework.stereotype.Service;

import java.util.List;

public class ReportServiceImpl implements ReportService {

    private final ReportRepository reportRepo;
    private final CitizenRepository citizenRepo;
    private final LocationRepository locationRepo;
    private final PhotoRepository photoRepo;

    public ReportServiceImpl(ReportRepository reportRepo, CitizenRepository citizenRepo, LocationRepository locationRepo, PhotoRepository photoRepo) {
        this.reportRepo = reportRepo;
        this.citizenRepo = citizenRepo;
        this.locationRepo = locationRepo;
        this.photoRepo = photoRepo;
    }


    @Override
    public Report createReport(ReportRequestDTO reportDTO) {
        
        Citizen citizen = citizenRepo.findById(reportDTO.getCitizenId()).orElseThrow(() -> new RuntimeException("Citizen not found"));
        
        Location location = locationRepo.findById(reportDTO.getLocationId()).orElseThrow(() -> new RuntimeException("Location not found"));
        
        Photo photo = null;
        if (reportDTO.getPhotoId() != null) {
            photo = photoRepo.findById(reportDTO.getPhotoId()).orElse(null);
        }

        DisasterType disasterType = DisasterType.valueOf(reportDTO.getDisasterType().toUpperCase());

        Report report = new Report(
            citizen,
            disasterType,
            reportDTO.isStatus(),
            location,
            reportDTO.getDescriptionOfDisaster(),
            reportDTO.getCreatedAt(),
            photo
        );

        return reportRepo.save(report);
    }

    @Override
    public List<Report> getAllReports() {
        return reportRepo.findAll();
    }

    @Override
    public Report getReportById(Long id) {
        return reportRepo.findById(id).orElseThrow(() -> new RuntimeException("Report not found"));
    }

    @Override
    public Report updateReport(Long id, ReportRequestDTO reportDTO) {
        
        Report report = reportRepo.findById(id).orElseThrow(() -> new RuntimeException("Report not found"));
        
        Citizen citizen = citizenRepo.findById(reportDTO.getCitizenId()).orElseThrow(() -> new RuntimeException("Citizen not found"));
        
        Location location = locationRepo.findById(reportDTO.getLocationId()).orElseThrow(() -> new RuntimeException("Location not found"));
        
        Photo photo = null;
        if (reportDTO.getPhotoId() != null) {
            photo = photoRepo.findById(reportDTO.getPhotoId()).orElse(null);
        }    
        DisasterType disasterType = DisasterType.valueOf(reportDTO.getDisasterType().toUpperCase());

        report.setCitizen(citizen);
        report.setDisasterType(disasterType);
        report.setStatus(reportDTO.isStatus());
        report.setLocation(location);
        report.setDescriptionOfDisaster(reportDTO.getDescriptionOfDisaster());
        report.setPhoto(photo);

        return reportRepo.save(report);
    }

    @Override
    public void deleteReport(Long id) {
        Report report = reportRepo.findById(id).orElseThrow(() -> new RuntimeException("Report not found"));

        reportRepo.delete(report);
    }
    
}