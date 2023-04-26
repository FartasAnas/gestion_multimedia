package stage.dcm.api.controllers;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import stage.dcm.api.entities.Category;
import stage.dcm.api.exceptions.NotFoundException;
import stage.dcm.api.services.CategoryServices;

import java.util.List;

@RestController
@RequestMapping("/categories")
public class CategoryControllers {
    @Autowired
    private CategoryServices categoryServices;

    @PostMapping("/add")
    public ResponseEntity<Category> saveCategory(@RequestBody Category category) {
        return new ResponseEntity<>(categoryServices.saveCategory(category), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable Long id) throws NotFoundException {
        return new ResponseEntity<>(categoryServices.getCategoryById(id), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Category>> getAllCategories() {
        return new ResponseEntity<>(categoryServices.getAllCategories(), HttpStatus.OK);
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<Category> getCategoryByName(@PathVariable String name) {
        return new ResponseEntity<>(categoryServices.getCategoryByName(name), HttpStatus.OK);
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
