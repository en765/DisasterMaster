package dm_be.service;

import dm_be.domain.Citizen;
import dm_be.domain.Photo;
import dm_be.domain.Report;
import dm_be.dao.CitizenRepository;
import dm_be.dao.PhotoRepository;
import dm_be.dao.ReportRepository;
import dm_be.dto.PhotoRequestDTO;
import dm_be.service.PhotoService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PhotoServiceImpl implements PhotoService {

    private final PhotoRepository photoRepo;
    private final CitizenRepository citizenRepo;
    private final ReportRepository reportRepo;

    public PhotoServiceImpl(PhotoRepository photoRepo, CitizenRepository citizenRepo,
                            ReportRepository reportRepo) {
        this.photoRepo = photoRepo;
        this.citizenRepo = citizenRepo;
        this.reportRepo = reportRepo;
    }

    @Override
    public Photo createPhoto(PhotoRequestDTO photoRequestDTO) {
        Citizen citizen = citizenRepo.findById(photoRequestDTO.getCitizenId())
                .orElseThrow(() -> new RuntimeException("Citizen not found"));

        Report report = reportRepo.findById(photoRequestDTO.getReportId())
                .orElse(null);

        Photo photo = new Photo(
                photoRequestDTO.getPhotoURL(),
                LocalDateTime.now(),
                citizen,
                report
        );

        return photoRepo.save(photo);
    }

    @Override
    public List<Photo> getAllPhotos() {
        return photoRepo.findAll();
    }

    @Override
    public Photo getPhotoById(Long id) {
        return photoRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Photo not found"));
    }

    @Override
    public void deletePhoto(Long id) {
        Photo photo = photoRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Photo not found"));
        photoRepo.delete(photo);
    }
}
