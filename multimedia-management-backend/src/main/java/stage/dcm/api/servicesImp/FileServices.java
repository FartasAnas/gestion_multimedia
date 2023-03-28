package stage.dcm.api.servicesImp;

import org.springframework.web.multipart.MultipartFile;
import stage.dcm.api.entities.File;
import stage.dcm.api.exceptions.NotFoundException;

import java.util.List;

public interface FileServices {
    public File saveFile(File file, MultipartFile multipartFile) throws NotFoundException;
    public File getFileById(Long id);
    public File getFileByName(String filename);
    public List<File> getAllFiles();
    public File updateFile(Long id,File file);
    public void deleteFile(Long id);
}
