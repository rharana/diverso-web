package diversolab.backend.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import diversolab.backend.model.Image;
import diversolab.backend.model.Video;
import diversolab.backend.service.VideoService;
import diversolab.backend.service.ImageService;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class FileUploadController {

    private final Path root = Paths.get("uploads");

    @Autowired
    private ImageService imageService;

    @Autowired
    private VideoService videoService;

    @PostMapping("/upload/image")
    public ResponseEntity<Map<String, String>> uploadImage(@RequestParam("file") MultipartFile file) {
        try {

            if (!Files.exists(root)) {
                Files.createDirectory(root);
            }

            String filename = file.getOriginalFilename();
            Files.copy(file.getInputStream(), this.root.resolve(filename));

            String fileUrl = "http://localhost:8080/uploads/" + filename;

            Image image = new Image();
            image.setName(filename);
            image.setUrl(fileUrl);
            imageService.saveImage(image);

            Map<String, String> response = new HashMap<>();
            response.put("url", fileUrl);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            throw new RuntimeException("Error uploading file", e);
        }
    }

    @PostMapping("/upload/video")
    public ResponseEntity<Map<String, String>> uploadVideo(@RequestParam("file") MultipartFile file) {
        try {
            if (!Files.exists(root)) {
                Files.createDirectory(root);
            }

            String filename = file.getOriginalFilename();
            Files.copy(file.getInputStream(), this.root.resolve(filename));

            String fileUrl = "http://localhost:8080/uploads/" + filename;

            Video video = new Video();
            video.setName(filename);
            video.setUrl(fileUrl);
            videoService.saveVideo(video);

            Map<String, String> response = new HashMap<>();
            response.put("url", fileUrl);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            throw new RuntimeException("Error uploading file", e);
        }
    }
}
