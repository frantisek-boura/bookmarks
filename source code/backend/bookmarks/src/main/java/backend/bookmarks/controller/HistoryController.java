package backend.bookmarks.controller;

import backend.bookmarks.entity.History;
import backend.bookmarks.service.HistoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.function.EntityResponse;

import java.util.List;

@RestController
@RequestMapping("/history")
@Tag(name = "Link update history")
public class HistoryController {

    @Autowired
    private HistoryService historyService;

    @Operation(description = "Gets link update history records by link ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK")
    })
    @PostMapping
    public ResponseEntity<?> getHistoryByLinkId(@RequestParam("id") Long linkId) {
        List<History> historyRecords = historyService.getHistoryByLinkId(linkId);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(historyRecords);
    }



}
