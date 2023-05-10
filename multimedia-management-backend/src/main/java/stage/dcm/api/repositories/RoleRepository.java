package stage.dcm.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import stage.dcm.api.entities.Role;

public interface RoleRepository extends JpaRepository<Role,Long> {
    Role findByNameIgnoreCase(String name);
}