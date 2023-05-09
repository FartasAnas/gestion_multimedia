package stage.dcm.api.controllers;

import lombok.AllArgsConstructor;
import ma.indh.minio.exception.MinioException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import stage.dcm.api.entities.Category;
import stage.dcm.api.exceptions.NotFoundException;
import stage.dcm.api.services.CategoryServices;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/categories")
public class CategoryControllers {
    @Autowired
    private CategoryServices categoryServices;

    @PostMapping("/add")
    public ResponseEntity<Category> saveCategory(@RequestPart("category")Category category, @RequestParam(name = "icon",required = false) MultipartFile categoryIcon) {
        return new ResponseEntity<>(categoryServices.saveCategory(category,categoryIcon), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable Long id) throws NotFoundException {
        return new ResponseEntity<>(categoryServices.getCategoryById(id), HttpStatus.OK);
    }
    @GetMapping("/path/{path}")
    public ResponseEntity<Category> getCategoryByPath(@PathVariable String path) throws NotFoundException {
        return new ResponseEntity<>(categoryServices.getCategoryByPath(path), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Category>> getAllCategories() {
        return new ResponseEntity<>(categoryServices.getAllCategories(), HttpStatus.OK);
    }
    @GetMapping("/icon/{id}")
    public ResponseEntity<Void> getCategoryIcon(@PathVariable Long id, HttpServletResponse response) throws NotFoundException, IOException, MinioException {
        categoryServices.getCategoryIcon(id, response);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable Long id, @RequestBody Category category) throws NotFoundException {
        return new ResponseEntity<>(categoryServices.updateCategory(id, category), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id) throws NotFoundException {
        categoryServices.deleteCategory(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
