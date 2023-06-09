package stage.dcm.api.servicesImp;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ma.indh.minio.exception.MinioException;
import ma.indh.minio.service.MinioService;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import stage.dcm.api.dto.NextPreviousFilesDTO;
import stage.dcm.api.entities.*;
import stage.dcm.api.enums.FileType;
import stage.dcm.api.exceptions.NotFoundException;
import stage.dcm.api.repositories.FileRepository;
import stage.dcm.api.repositories.KeywordRepository;
import stage.dcm.api.services.CategoryServices;
import stage.dcm.api.services.FileServices;

import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;
import java.io.IOException;
import java.io.InputStream;
import java.net.URLConnection;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor @Slf4j
public class FileServicesImp implements FileServices {
    private final MinioService minioService;
    private final FileRepository fileRepository;
    private final UserServices userServices;
    private final CategoryServices categoryServices;

    private final KeywordServicesImp keywordServices;

    private final KeywordRepository keywordRepository;

    @Override
    public File saveFile(File file, MultipartFile multipartFiles) throws NotFoundException, IllegalStateException {
        Random random = new Random();
        User createdBy=userServices.getUserByUsername(file.getCreatedBy());
        file.setUser(createdBy);
        log.info("file category: {}",file.getCategory());
        if(file.getUser()!=null) {
            file.setId(Math.abs(random.nextLong()) % 10000000000L);
            file.setCategory(categoryServices.getCategory(file.getCategory()));
            String fullPath = String.join("/","users", file.getUser().getUsername(),file.getCategory().getId().toString(), file.getType().toString(),file.getId().toString(), multipartFiles.getOriginalFilename());
            List<Keyword> newKeywords = new ArrayList<>();
            for (Keyword keyword : file.getKeywords()) {
                log.info("keyword: {}", keyword);
                if (keywordRepository.findById(keyword.getId()).orElse(null) == null) {
                    newKeywords.add(keywordServices.saveKeyword(new Keyword(null, keyword.getName())));
                } else {
                    newKeywords.add(keyword);
                }
            }
            file.setKeywords(newKeywords);

            if (!hasPermissionToAddFileType(createdBy.getRoles(), file.getType(), file.getCategory() , createdBy.getIsActive())) {
                throw new IllegalStateException("User does not have permission to add this file type");
            }

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
    private boolean hasPermissionToAddFileType(Collection<Role> roles, FileType fileType , Category category, boolean isUserActive) {
        if(isUserActive){
            for (Role role : roles) {
                if(role.getIsActive()){
                    for (Action action:role.getActions()){
                        if(action.getCategory().getId().equals(category.getId())){
                            switch (fileType) {
                                case IMAGE:
                                    return action.getImage().isWrite();
                                case VIDEO:
                                    return action.getVideo().isWrite();
                                case PICTOGRAM:
                                    return action.getPictogram().isWrite();
                                case DOCUMENT:
                                    return action.getDocument().isWrite();
                                default:
                                    break;
                            }
                        }
                    }

                }
            }
        }
        return false;
    }
    @Override
    public Long countFilesByType(String createdBy,String type) {
        return fileRepository.countByCreatedByAndTypeAndCategoryIsActive(createdBy, FileType.valueOf(type.toUpperCase()), true);
    }

    @Override
    public File getFileById(Long id) throws NotFoundException {
        File fileDto= fileRepository.findById(id).orElseThrow(() -> new NotFoundException("File was not found"));
        User createdBy=userServices.getUserByUsername(fileDto.getCreatedBy());
        if(!hasPermissionToReadFileType(createdBy.getRoles(),fileDto.getType(),fileDto.getCategory(),createdBy.getIsActive())){
            throw new NotFoundException("User does not have permission to read this file type");
        }
        return fileDto;
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
    public List<File> getUserFiles(String username, String type, String category, int page, int pageSize) throws NotFoundException {
        return userFilesList(username,type,category);
    }
    public List<File> userFilesList(String username, String type, String category) throws NotFoundException{
        User userDto = userServices.getUserByUsername(username);
        Category categoryDto = categoryServices.getCategory(new Category(null,null,null,category.toLowerCase(),null,null,null));
        if(!hasPermissionToReadFileType(userDto.getRoles(),FileType.valueOf(type.toUpperCase()),categoryDto,userDto.getIsActive())){
            throw new NotFoundException("User does not have permission to read this file type");
        }
        if (userDto != null && categoryDto!=null) {
            List<File> userFiles = userDto.getFiles().stream()
                    .filter(file -> file.getType().toString().equals(type) && file.getCategory().equals(categoryDto))
                    .sorted(Comparator.comparing(File::getCreationDate))
                    .collect(Collectors.toList());
            return userFiles;
        } else {
            throw new NotFoundException("User Not Found");
        }
    }
    private boolean hasPermissionToReadFileType(Collection<Role> roles, FileType fileType , Category category , boolean isUserActive){
        if(isUserActive){
            for(Role role:roles){
                if(role.getIsActive()){
                    for(Action action:role.getActions()){
                        if(action.getCategory().getId().equals(category.getId())){
                            switch (fileType){
                                case IMAGE:
                                    return action.getImage().getIsActive();
                                case VIDEO:
                                    return action.getVideo().getIsActive();
                                case PICTOGRAM:
                                    return action.getPictogram().getIsActive();
                                case DOCUMENT:
                                    return action.getDocument().getIsActive();
                                default:
                                    break;
                            }
                        }
                    }
                }
            }
        }
        return false;
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
    public NextPreviousFilesDTO getNextPreviousFiles(Long id) throws NotFoundException {
        File currentFile = getFileById(id);
        Collection<File> fileList = userFilesList(currentFile.getCreatedBy(), currentFile.getType().toString(),currentFile.getCategory().getLabel());
        Long nextFileId = null;
        Long previousFileId = null;
        Iterator<File> iterator = fileList.iterator();
        File previousFile = null;
        while (iterator.hasNext()) {
            File file = iterator.next();
            if (file.getId().equals(id)) {
                previousFileId = (previousFile != null) ? previousFile.getId() : fileList.stream().reduce((a, b) -> b).get().getId();
                nextFileId = (iterator.hasNext()) ? iterator.next().getId() : fileList.stream().findFirst().get().getId();
                break;
            }
            previousFile = file;
        }
        if (nextFileId == null || previousFileId == null) {
            throw new NotFoundException("File not found in user files list");
        }
        return new NextPreviousFilesDTO(nextFileId, previousFileId);
    }


    @Override
    public File updateFile(Long id, File file) throws NotFoundException {
        File fileToUpdate=getFileById(id);
        User createdBy=userServices.getUserByUsername(fileToUpdate.getCreatedBy());
        if (!hasPermissionToAddFileType(createdBy.getRoles(), fileToUpdate.getType(), fileToUpdate.getCategory() , createdBy.getIsActive())) {
            throw new IllegalStateException("User does not have permission to Modify this file type");
        }
        fileToUpdate.setFileName(file.getFileName()!=null ? file.getFileName() : fileToUpdate.getFileName());
        fileToUpdate.setDescription( file.getDescription()!=null ? file.getDescription() : fileToUpdate.getDescription() );
        fileToUpdate.setState( file.getState()!=null ? file.getState() : fileToUpdate.getState() );
        fileToUpdate.setVersion( file.getVersion()!=null ? file.getVersion() : fileToUpdate.getVersion() );
        Collection<Keyword> newKeywords=new ArrayList<>();
        for (Keyword keyword:file.getKeywords()){
            if(keywordRepository.findById(keyword.getId()).orElse(null)==null){
                keywordServices.saveKeyword(keyword);
            }
            newKeywords.add(keyword);
        }
        fileToUpdate.setKeywords(newKeywords);
        return fileRepository.save(fileToUpdate);
    }

    @Override
    public void deleteFile(Long id) throws NotFoundException {
        File file=getFileById(id);
        User createdBy=userServices.getUserByUsername(file.getCreatedBy());
        if (!hasPermissionToAddFileType(createdBy.getRoles(), file.getType(), file.getCategory(), createdBy.getIsActive())) {
            throw new IllegalStateException("User does not have permission to Delete this file type");
        }
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
