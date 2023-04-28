package stage.dcm.api.servicesImp;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ma.indh.minio.exception.MinioException;
import ma.indh.minio.service.MinioService;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import stage.dcm.api.entities.Category;
import stage.dcm.api.entities.File;
import stage.dcm.api.exceptions.NotFoundException;
import stage.dcm.api.repositories.CategoryRepository;
import stage.dcm.api.services.CategoryServices;

import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;
import java.io.IOException;
import java.io.InputStream;
import java.net.URLConnection;
import java.util.List;
import java.util.Optional;

@Service @Transactional
@RequiredArgsConstructor @Slf4j
public class CategoryServicesImp implements CategoryServices {

    private final CategoryRepository categoryRepository;
    private final MinioService minioService;

    @Override
    public Category saveCategory(Category category, MultipartFile categoryIcon) {
        log.info("isActive:{}",category);
        String iconPath=String.join("/","icons/category",category.getName(),categoryIcon.getOriginalFilename());
        try {
            minioService.upload(iconPath, categoryIcon.getInputStream());
            category.setIconPath(iconPath);
            category.setName(category.getName().toLowerCase());
            return categoryRepository.save(category);
        } catch (IOException | MinioException e) {
            throw new IllegalStateException("The file cannot be read", e);
        }
    }

    @Override
    public Category getCategoryById(Long id) throws NotFoundException {
        Optional<Category> category = categoryRepository.findById(id);
        if (category.isPresent()) {
            return category.get();
        } else {
            throw new NotFoundException("Category not found with id: " + id);
        }
    }
    @Override
    public Category getCategory(Category category) throws NotFoundException {
        if (category.getId() != null) {
            return getCategoryById(category.getId());
        } else if (category.getName() != null) {
            return getCategoryByName(category.getName());
        } else {
            throw new NotFoundException("Category not found");
        }
    }
    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Category getCategoryByName(String name) {
        return categoryRepository.findByName(name);
    }

    @Override
    public void getCategoryIcon(Long id, HttpServletResponse response) throws NotFoundException, MinioException, IOException {
        Category categoryDto= getCategoryById(id);
        String path = categoryDto.getIconPath();
        InputStream inputStream = minioService.get(path);
        String iconName = categoryDto.getIconPath().substring(categoryDto.getIconPath().lastIndexOf("/") + 1);
        response.addHeader("Content-disposition", "attachment;filename=" + iconName);
        response.setContentType(URLConnection.guessContentTypeFromName(iconName));
        IOUtils.copy(inputStream, response.getOutputStream());
        response.flushBuffer();
    }

    @Override
    public Category updateCategory(Long id, Category category) throws NotFoundException {
        Category existingCategory = categoryRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Category not found"));
        existingCategory.setName(category.getName() != null ? category.getName() : existingCategory.getName());
        existingCategory.setPath(category.getPath() != null ? category.getPath() : existingCategory.getPath());
        existingCategory.setIsActive(category.getIsActive() != null ? category.getIsActive() : existingCategory.getIsActive());
        return categoryRepository.save(existingCategory);
    }

    @Override
    public void deleteCategory(Long id) throws NotFoundException {
        if (categoryRepository.existsById(id)) {
            categoryRepository.deleteById(id);
        } else {
            throw new NotFoundException("Category not found with id: " + id);
        }
    }
}

