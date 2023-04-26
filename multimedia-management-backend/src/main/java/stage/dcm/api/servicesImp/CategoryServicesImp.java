package stage.dcm.api.servicesImp;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import stage.dcm.api.entities.Category;
import stage.dcm.api.exceptions.NotFoundException;
import stage.dcm.api.repositories.CategoryRepository;
import stage.dcm.api.services.CategoryServices;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service @Transactional
@RequiredArgsConstructor
public class CategoryServicesImp implements CategoryServices {

    private final CategoryRepository categoryRepository;

    @Override
    public Category saveCategory(Category category) {
        return categoryRepository.save(category);
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
    public Category updateCategory(Long id, Category category) throws NotFoundException {
        Category existingCategory = categoryRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Category not found"));
        existingCategory.setName(category.getName() != null ? category.getName() : existingCategory.getName());
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

