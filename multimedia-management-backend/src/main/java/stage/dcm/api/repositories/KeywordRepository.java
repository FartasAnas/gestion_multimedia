package stage.dcm.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import stage.dcm.api.entities.Keyword;

import java.util.Optional;

public interface KeywordRepository extends JpaRepository<Keyword,Long> {
    Keyword findByName(String name);
}
