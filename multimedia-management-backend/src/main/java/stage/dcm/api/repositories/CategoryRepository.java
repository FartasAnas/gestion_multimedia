package stage.dcm.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import stage.dcm.api.entities.Category;

public interface CategoryRepository extends JpaRepository<Category,Long> {
    Category findByPath(String path);

    Category findByLabel(String label);
}
