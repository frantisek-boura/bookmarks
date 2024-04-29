package backend.bookmarks.controller;

import backend.bookmarks.entity.Image;
import backend.bookmarks.service.ImageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/image")
public class ImageController {

    @Autowired
    private ImageService imageService;

    @Operation(description = "Gets image by image ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "404", description = "Image not found"),
            @ApiResponse(responseCode = "200", description = "Ok")
    })
    @GetMapping("/{imageId}")
    public ResponseEntity<?> getImageById(@PathVariable Long imageId) {
        Optional<Image> image = imageService.getImageById(imageId);
        if (image.isEmpty()) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Image with id " + imageId + " not found");
        }

        return ResponseEntity
                .status(HttpStatus.OK)
                .header("Content-Type", image.get().getType())
                .body(image.get().getData());
    }

}
