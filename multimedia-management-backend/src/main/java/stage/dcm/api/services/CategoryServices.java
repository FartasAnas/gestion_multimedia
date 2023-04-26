package stage.dcm.api.services;

import stage.dcm.api.entities.Category;
import stage.dcm.api.exceptions.NotFoundException;

import java.util.List;

public interface CategoryServices {
    public Category saveCategory(Category category);
    public Category getCategoryById(Long id) throws NotFoundException;
    public Category getCategory(Category category) throws NotFoundException;
    public List<Category> getAllCategories();
    public Category getCategoryByName(String name);
    public Category updateCategory(Long id, Category category) throws NotFoundException;
    public void deleteCategory(Long id) throws NotFoundException;
}
