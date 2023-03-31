package stage.dcm.api.controllers;


import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ma.indh.minio.exception.MinioException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
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

    @GetMapping("/object/{id}")
    public void getFileObject(@PathVariable("id") Long id, HttpServletResponse response) throws MinioException, NotFoundException, IOException {
        fileServices.getFileObject(id, response);
    }
    @GetMapping("/user/{username}/{type}")
    public Collection<File> getUserFilesByType(@PathVariable("username") String username, @PathVariable("type") String type) throws NotFoundException {
        return fileServices.getUserFilesByType(username,type);
    }

    @GetMapping("/name/{name}")
    public File getFileByName(@PathVariable String name){
        return fileServices.getFileByName(name);
    }
    @GetMapping("")
    public List<File> getAllFiles(){
        return fileServices.getAllFiles();
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
