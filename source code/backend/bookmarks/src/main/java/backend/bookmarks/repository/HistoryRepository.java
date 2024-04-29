package backend.bookmarks.repository;

import backend.bookmarks.entity.History;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

@Transactional
public interface HistoryRepository extends JpaRepository<History, Long> {
}
