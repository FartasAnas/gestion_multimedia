package stage.dcm.api.controllers;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ma.indh.minio.exception.MinioException;
import ma.indh.minio.service.MinioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import stage.dcm.api.entities.File;
import stage.dcm.api.exceptions.NotFoundException;
import stage.dcm.api.services.FileServicesImp;

import java.io.IOException;
import java.util.List;

@RestController @RequestMapping("/files") @Slf4j
public class FileControllers {
    @Autowired
    private FileServicesImp fileServicesImp;

    @PostMapping("/add")
    public File saveFile(@RequestPart("fileObject") File file, @RequestParam("file") MultipartFile multipartFile) throws NotFoundException {
        return fileServicesImp.saveFile(file,multipartFile);
    }

    @GetMapping("/{id}")
    public File getFileById(@PathVariable Long id) throws NotFoundException {
        return fileServicesImp.getFileById(id);
    }

    @GetMapping("/name/{name}")
    public File getFileByName(@PathVariable String name){
        return fileServicesImp.getFileByName(name);
    }
    @GetMapping("")
    public List<File> getAllFiles(){
        return fileServicesImp.getAllFiles();
    }
    @PutMapping("/update/{id}")
    public File updateFile(@PathVariable Long id,@RequestBody File file) throws NotFoundException {
        return fileServicesImp.updateFile(id,file);
    }
    @DeleteMapping("/delete/{id}")
    public void deleteFile(@PathVariable Long id) throws NotFoundException {
        fileServicesImp.deleteFile(id);
    }
}
