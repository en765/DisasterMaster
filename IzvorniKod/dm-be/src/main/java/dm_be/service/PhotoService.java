package dm_be.service;

import dm_be.domain.Photo;
import dm_be.dto.PhotoRequestDTO;

import java.util.List;

public interface PhotoService {
    Photo createPhoto(PhotoRequestDTO photoDTO);
    List<Photo> getAllPhotos();
    Photo getPhotoById(Long id);
    void deletePhoto(Long id);
}
