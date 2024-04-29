package backend.bookmarks.service;

import backend.bookmarks.entity.History;
import backend.bookmarks.entity.Link;
import backend.bookmarks.repository.HistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class HistoryService {

    @Autowired
    private HistoryRepository historyRepository;

    public History newHistoryRecord(Link link) {
        History history = History.builder()
                .name(link.getName())
                .url(link.getUrl())
                .linkId(link.getId())
                .imageId(link.getImage().getId())
                .description(link.getDescription())
                .dateOfChange(LocalDateTime.now())
                .build();

        return historyRepository.save(history);
    }

    public List<History> getHistoryByLinkId(Long linkId) {
        List<History> historyRecords = historyRepository.findAll();
        List<History> filtered = historyRecords.stream().filter(history -> history.getLinkId().equals(linkId)).toList();
        return filtered;
    }

}
