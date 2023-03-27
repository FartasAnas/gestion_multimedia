package stage.dcm.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import stage.dcm.api.entities.User;

public interface UserRepository extends JpaRepository<User,Long> {
    User findByUsername(String username);
    User findByEmail(String email);
}