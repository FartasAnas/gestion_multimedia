package stage.dcm.api.servicesImp;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ma.indh.minio.exception.MinioException;
import ma.indh.minio.service.MinioService;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import stage.dcm.api.entities.File;
import stage.dcm.api.entities.User;
import stage.dcm.api.exceptions.NotFoundException;
import stage.dcm.api.repositories.FileRepository;
import stage.dcm.api.services.FileServices;


import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;
import java.io.IOException;
import java.io.InputStream;
import java.net.URLConnection;
import java.util.Collection;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor @Slf4j
public class FileServicesImp implements FileServices {
    private final MinioService minioService;
    private final FileRepository fileRepository;
    private final UserServices userServices;

    @Override
    public File saveFile(File file, MultipartFile multipartFiles) throws NotFoundException {
        Random random = new Random();
        file.setUser(userServices.getUserByUsername(file.getCreatedBy()));
        if(file.getUser()!=null) {
            file.setId(Math.abs(random.nextLong()) % 10000000000L);
            String fullPath = String.join("/", file.getUser().getUsername(), file.getType().toString(),file.getId().toString(), file.getFileName());
            try {
                minioService.upload(fullPath, multipartFiles.getInputStream());
                file.setSize(formatFileSize(multipartFiles.getSize()));
                file.setFilepath(fullPath);
                return fileRepository.save(file);
            } catch (IOException | MinioException e) {
                throw new IllegalStateException("The file cannot be read", e);
            }
        }
        else {
            throw new NotFoundException("User not found");
        }
    }

    @Override
    public File getFileById(Long id) throws NotFoundException {
        return fileRepository.findById(id).orElseThrow(() -> new NotFoundException("User was not found"));
    }

    @Override
    public void getFileObject(Long id, HttpServletResponse response) throws NotFoundException, MinioException, IOException {
        File fileDto= getFileById(id);
        String path = fileDto.getFilepath();
        InputStream inputStream = minioService.get(path);
        response.addHeader("Content-disposition", "attachment;filename=" + fileDto.getFileName());
        response.setContentType(URLConnection.guessContentTypeFromName(fileDto.getFileName()));
        IOUtils.copy(inputStream, response.getOutputStream());
        response.flushBuffer();
    }

    @Override
    public Collection<File> getUserFilesByType(String username, String type) throws NotFoundException {
        User userDto = userServices.getUserByUsername(username);
        if (userDto != null) {
            return userDto.getFiles().stream()
                    .filter(file -> file.getType().toString().equals(type))
                    .collect(Collectors.toList());
        } else {
            throw new NotFoundException("User Not Found");
        }
    }

    @Override
    public File getFileByName(String filename) {
        return fileRepository.findByFileName(filename);
    }

    @Override
    public List<File> getAllFiles() {
        return fileRepository.findAll();
    }

    @Override
    public File updateFile(Long id, File file) throws NotFoundException {
        File fileToUpdate=getFileById(id);
        fileToUpdate.setFileName( file.getFileName()!=null ? file.getFileName() : fileToUpdate.getFileName() );
        fileToUpdate.setCreationDate( file.getCreationDate()!=null ? file.getCreationDate() : fileToUpdate.getCreationDate() );
        fileToUpdate.setDescription( file.getDescription()!=null ? file.getDescription() : fileToUpdate.getDescription() );
        fileToUpdate.setType( file.getType()!=null ? file.getType() : fileToUpdate.getType() );
        fileToUpdate.setState( file.getState()!=null ? file.getState() : fileToUpdate.getState() );
        fileToUpdate.setVersion( file.getVersion()!=null ? file.getVersion() : fileToUpdate.getVersion() );
        return fileRepository.save(fileToUpdate);
    }

    @Override
    public void deleteFile(Long id) throws NotFoundException {
        File file=getFileById(id);
        try {
            if(file!=null){
                minioService.remove(file.getFilepath());
                fileRepository.deleteById(id);
            }
        }catch (Exception e) {
            throw new IllegalStateException("The file cannot be remove", e);
        }
    }

    public String formatFileSize(long size) {
        String[] units = {"B", "KB", "MB", "GB", "TB"};
        int index = 0;
        double formattedSize = size;

        while (formattedSize >= 1024 && index < units.length - 1) {
            formattedSize /= 1024;
            index++;
        }

        return String.format("%.2f %s", formattedSize, units[index]);
    }
}
