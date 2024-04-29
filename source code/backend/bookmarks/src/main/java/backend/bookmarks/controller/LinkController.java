package backend.bookmarks.controller;

import backend.bookmarks.dto.LinkDTO;
import backend.bookmarks.entity.Link;
import backend.bookmarks.service.HistoryService;
import backend.bookmarks.service.LinkService;
import backend.bookmarks.util.ImageUtils;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/link")
public class LinkController {

    @Autowired
    private LinkService linkService;

    @Autowired
    private HistoryService historyService;

    @Autowired
    private RestTemplate linkTester;

    @Operation(description = "Uploads a link with specified parameters")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "422", description = "Cannot upload a link with these parameters"),
            @ApiResponse(responseCode = "415", description = "Included file is not an image"),
            @ApiResponse(responseCode = "200", description = "Ok")
    })
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> uploadLink(@ModelAttribute LinkDTO linkDto) throws IOException {
        if (linkDto.getName().isEmpty() || linkDto.getUrl().isEmpty() || linkDto.getImage() == null || linkDto.getImage().isEmpty()) {
            return ResponseEntity
                    .status(HttpStatus.UNPROCESSABLE_ENTITY)
                    .body("Missing parameters Name, URL or Image");
        }

        if (!linkDto.getImage().getContentType().startsWith("image/")) {
            return ResponseEntity
                    .status(HttpStatus.UNSUPPORTED_MEDIA_TYPE)
                    .body("Included file is not an image");
        }

        Link uploadedLink = linkService.uploadLink(linkDto);
        historyService.newHistoryRecord(uploadedLink);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body("Link (" + uploadedLink.getId() + ") uploaded successfully");
    }

    @Operation(description = "Updates a link with specified parameters")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "404", description = "Link with specified ID not found"),
            @ApiResponse(responseCode = "200", description = "Ok")
    })
    @PostMapping("/update")
    public ResponseEntity<?> updateLink(@ModelAttribute LinkDTO linkDto) throws IOException {
        Optional<Link> updatedLink = linkService.updateLink(linkDto);
        if (updatedLink.isEmpty()) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Link with id " + linkDto.getId() + " not found");
        }

        historyService.newHistoryRecord(updatedLink.get());

        return ResponseEntity
                .status(HttpStatus.OK)
                .body("Link with id " + linkDto.getId() + " updated successfully");
    }

    @Operation(description = "Deletes a link with specified ID, calls to ignore non-existent links are ignored")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok")
    })
    @PostMapping("/delete")
    public ResponseEntity<?> deleteLink(@RequestParam("id") Long linkId) {
        linkService.deleteLink(linkId);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body("Link with id " + linkId + " deleted successfully");
    }

    @Operation(description = "Deletes all links")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok")
    })
    @PostMapping("/purge")
    public ResponseEntity<?> purgeLinks() {
        linkService.purgeLinks();
        return ResponseEntity
                .status(HttpStatus.OK)
                .body("All links deleted successfully");
    }

    @Operation(description = "Gets all links")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Ok")
    })
    @GetMapping
    public ResponseEntity<?> getAllLinks() {
        List<Link> links = linkService.getLinks();

        links.forEach(link -> {
            link.getImage().setData(ImageUtils.decompressImage(link.getImage().getData()));
        });

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(links);
    }

}
