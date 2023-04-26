package stage.dcm.api.controllers;


import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ma.indh.minio.exception.MinioException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import stage.dcm.api.dto.NextPreviousFilesDTO;
import stage.dcm.api.entities.File;
import stage.dcm.api.exceptions.NotFoundException;
import stage.dcm.api.services.FileServices;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collection;
import java.util.List;

@RestController @RequestMapping("/files") @Slf4j @AllArgsConstructor
public class FileControllers {
    @Autowired
    private final FileServices fileServices;

    @PostMapping("/add")
    public File saveFile(@RequestPart("fileObject") File file, @RequestParam("file") MultipartFile multipartFile) throws NotFoundException {
        return fileServices.saveFile(file,multipartFile);
    }

    @GetMapping("/{id}")
    public File getFileById(@PathVariable Long id) throws NotFoundException {
        return fileServices.getFileById(id);
    }

    @GetMapping("/count/{createdBy}/{type}")
    public Long countFilesByType(@PathVariable String createdBy,@PathVariable String type) {
        return fileServices.countFilesByType(createdBy,type);
    }

    @GetMapping("/object/{id}")
    public void getFileObject(@PathVariable("id") Long id, HttpServletResponse response) throws MinioException, NotFoundException, IOException {
        fileServices.getFileObject(id, response);
    }
    @GetMapping("/user/{username}/{category}/{type}")
    public Collection<File> getUserFiles(@PathVariable("username") String username, @PathVariable("type") String type
                                        ,@PathVariable("category") String category,@RequestParam(name = "page", defaultValue = "1") int page
                                        ,@RequestParam(name = "pageSize", defaultValue = "10") int pageSize) throws NotFoundException {
        return fileServices.getUserFiles(username,type,category,page,pageSize);
    }

    @GetMapping("/name/{name}")
    public File getFileByName(@PathVariable String name){
        return fileServices.getFileByName(name);
    }
    @GetMapping("")
    public List<File> getAllFiles(){
        return fileServices.getAllFiles();
    }

    @GetMapping("/next-previous/{id}")
    public NextPreviousFilesDTO getNextPreviousFiles(@PathVariable("id") Long id) throws NotFoundException {
        return fileServices.getNextPreviousFiles(id);
    }
    @PutMapping("/update/{id}")
    public File updateFile(@PathVariable Long id,@RequestBody File file) throws NotFoundException {
        return fileServices.updateFile(id,file);
    }
    @DeleteMapping("/delete/{id}")
    public void deleteFile(@PathVariable Long id) throws NotFoundException {
        fileServices.deleteFile(id);
    }
}
