package stage.dcm.api.services;

import ma.indh.minio.exception.MinioException;
import org.springframework.web.multipart.MultipartFile;
import stage.dcm.api.entities.Category;
import stage.dcm.api.exceptions.NotFoundException;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

public interface CategoryServices {
    public Category saveCategory(Category category, MultipartFile categoryIcon);
    public Category getCategoryById(Long id) throws NotFoundException;
    public Category getCategory(Category category) throws NotFoundException;
    public List<Category> getAllCategories();
    public Category getCategoryByName(String name);
    public void getCategoryIcon(Long id,HttpServletResponse response) throws NotFoundException, MinioException, IOException;
    public Category updateCategory(Long id, Category category) throws NotFoundException;
    public void deleteCategory(Long id) throws NotFoundException;
}
