package stage.dcm.api.services;

import lombok.RequiredArgsConstructor;
import ma.indh.minio.exception.MinioException;
import ma.indh.minio.service.MinioService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import stage.dcm.api.entities.File;
import stage.dcm.api.exceptions.NotFoundException;
import stage.dcm.api.repositories.FileRepository;
import stage.dcm.api.repositories.UserRepository;
import stage.dcm.api.servicesImp.FileServices;


import javax.transaction.Transactional;
import java.io.IOException;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class FileServicesImp implements FileServices {
    private final MinioService minioService;
    private final FileRepository fileRepository;
    private final UserRepository userRepository;

    @Override
    public File saveFile(File file, MultipartFile multipartFile) throws NotFoundException {
        file.setUser(userRepository.findByUsername(file.getCreatedBy()));
        if(file.getUser()!=null) {
            String fullPath = String.join("/", file.getUser().getId().toString(), file.getId().toString(), file.getType().toString(), file.getFileName());
            try {
                minioService.upload(fullPath, multipartFile.getInputStream());
                file.setFilepath(fullPath);
                return fileRepository.save(file);
            } catch (IOException | MinioException e) {
                throw new IllegalStateException("The file cannot be read", e);
            }
        }
        else {
            throw new NotFoundException("user not found");
        }
    }

    @Override
    public File getFileById(Long id) {
        return fileRepository.findById(id).orElse(null);
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
    public File updateFile(Long id, File file) {
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
    public void deleteFile(Long id) {
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
}
