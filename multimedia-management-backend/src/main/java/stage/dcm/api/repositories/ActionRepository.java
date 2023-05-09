package stage.dcm.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import stage.dcm.api.entities.Action;

public interface ActionRepository extends JpaRepository<Action,Long> {
}
