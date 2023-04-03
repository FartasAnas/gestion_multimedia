package stage.dcm.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import stage.dcm.api.entities.File;
import stage.dcm.api.enums.FileType;

public interface FileRepository extends JpaRepository<File,Long> {
    File findByFileName(String filename);
    Long countByCreatedByAndType(String createdBy,FileType fileType);
}
