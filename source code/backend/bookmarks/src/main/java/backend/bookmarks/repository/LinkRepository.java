package backend.bookmarks.repository;

import backend.bookmarks.entity.Link;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

@Transactional
public interface LinkRepository extends JpaRepository<Link, Long> {
}
