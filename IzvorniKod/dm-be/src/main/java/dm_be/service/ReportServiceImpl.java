package dm_be.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dm_be.dao.AppUserRepository;
import dm_be.dao.ReportRepository;
import dm_be.domain.AppUser;
import dm_be.domain.Report;
import dm_be.dto.ReportRequestDTO;

@Service
public class ReportServiceImpl implements ReportService{

    @Autowired
    private ReportRepository reportRepository;

    @Autowired
    private AppUserRepository appUserRepository;

    @Override
    public List<Report> getAllReports() {
        return reportRepository.findAll();
    }

    @Override
    public Report addReport(ReportRequestDTO reportDTO) {
        Report report = new Report();

        // Setovanje podataka iz DTO
        report.setDisasterType(reportDTO.getDisasterType());
        report.setLocation(reportDTO.getLocation());
        report.setDescription(reportDTO.getDescription());
        report.setCreatedAt(reportDTO.getCreatedAt());
        report.setPhoto(reportDTO.getPhoto());


        // Dodajte proveru za korisnika, ako je `userId` unet u DTO
        /*if (reportDTO.getUserId() != null) {
            AppUser user = appUserRepository.findByUserId(reportDTO.getUserId());  // Provera da li korisnik postoji
            if (user != null) {
                report.setUser(user);
            } else {
                throw new RuntimeException("User not found with id: " + reportDTO.getUserId());  // Ako korisnik nije pronađen, bacite izuzetak
            }
        }*/

        return reportRepository.save(report);  // Spasite report u bazi
    }

    @Override
    public Report getReportById(Long id) {
        return reportRepository.findById(id).orElse(null);
    }
    
}
