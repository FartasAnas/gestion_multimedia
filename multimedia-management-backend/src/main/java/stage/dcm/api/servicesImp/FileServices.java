package stage.dcm.api.servicesImp;

import org.springframework.web.multipart.MultipartFile;
import stage.dcm.api.entities.File;
import stage.dcm.api.exceptions.NotFoundException;

import java.util.List;

public interface FileServices {
    public File saveFile(File file,MultipartFile multipartFiles) throws NotFoundException;
    public File getFileById(Long id) throws NotFoundException;
    public File getFileByName(String filename);
    public List<File> getAllFiles();
    public File updateFile(Long id,File file) throws NotFoundException;
    public void deleteFile(Long id) throws NotFoundException;
}
