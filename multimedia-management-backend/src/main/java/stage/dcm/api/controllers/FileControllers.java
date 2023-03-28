package stage.dcm.api.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import stage.dcm.api.entities.File;
import stage.dcm.api.exceptions.NotFoundException;
import stage.dcm.api.services.FileServicesImp;

import java.util.List;

@RestController @RequestMapping("/files") @RequiredArgsConstructor
public class FileControllers {
    private FileServicesImp fileServicesImp;

    @PostMapping("/add")
    public File saveFile(@RequestBody File file, @RequestParam("file") MultipartFile multipartFile) throws NotFoundException {
        return fileServicesImp.saveFile(file,multipartFile);
    }

    @GetMapping("/{id}")
    public File getFileById(@PathVariable Long id){
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
    public File updateFile(@PathVariable Long id,@RequestBody File file){
        return fileServicesImp.updateFile(id,file);
    }
    @DeleteMapping("/delete/{id}")
    public void deleteFile(@PathVariable Long id){
        fileServicesImp.deleteFile(id);
    }
}
