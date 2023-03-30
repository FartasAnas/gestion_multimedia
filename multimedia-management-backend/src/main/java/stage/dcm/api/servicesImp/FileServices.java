package stage.dcm.api.servicesImp;

import ma.indh.minio.exception.MinioException;
import org.springframework.web.multipart.MultipartFile;
import stage.dcm.api.entities.File;
import stage.dcm.api.exceptions.NotFoundException;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collection;
import java.util.List;

public interface FileServices {
    public File saveFile(File file,MultipartFile multipartFiles) throws NotFoundException;
    public File getFileById(Long id) throws NotFoundException;
    public void getFileObject(Long id, HttpServletResponse response) throws NotFoundException, MinioException, IOException;
    public Collection<File> getUserFilesByType(String username,String type) throws NotFoundException;
    public File getFileByName(String filename);
    public List<File> getAllFiles();
    public File updateFile(Long id,File file) throws NotFoundException;
    public void deleteFile(Long id) throws NotFoundException;
}
