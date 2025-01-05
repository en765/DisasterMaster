package dm_be.rest;

import dm_be.domain.Photo;
import dm_be.dto.PhotoRequestDTO;
import dm_be.service.PhotoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/photos")
public class PhotoController {

    private final PhotoService photoService;

    public PhotoController(PhotoService photoService) {
        this.photoService = photoService;
    }

    @PostMapping
    public ResponseEntity<Photo> createPhoto(@RequestBody PhotoRequestDTO photoDTO) {
        Photo photo = photoService.createPhoto(photoDTO);
        return new ResponseEntity<>(photo, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Photo>> getAllPhotos() {
        List<Photo> photos = photoService.getAllPhotos();
        return ResponseEntity.ok(photos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Photo> getPhotoById(@PathVariable Long id) {
        Photo photo = photoService.getPhotoById(id);
        return ResponseEntity.ok(photo);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePhoto(@PathVariable Long id) {
        photoService.deletePhoto(id);
        return ResponseEntity.noContent().build();
    }
}
