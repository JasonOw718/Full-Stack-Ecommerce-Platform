package com.ecommerce.project.service;

import com.ecommerce.project.exceptions.APIException;
import com.ecommerce.project.model.Category;
import com.ecommerce.project.payload.CategoryDTO;
import com.ecommerce.project.payload.CategoryResponse;
import com.ecommerce.project.repositories.CategoryRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service("category")
public class CategoryServiceImp implements CategoryService{

    @Autowired
    private CategoryRepository repository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public CategoryResponse getAllCategories(Integer pageNumber,Integer pageSize,String sortBy,String sortOrder) {
        Sort sortByAndOrder = sortOrder.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sortByAndOrder);
        Page<Category> categoryPage = repository.findAll(pageDetails);
        List<Category> categories = categoryPage.getContent();
        if(categories.isEmpty())
            throw new APIException(HttpStatus.OK,"Category is empty");

        List<CategoryDTO> dtos = categories.stream().map(category -> modelMapper.map(category,CategoryDTO.class)).toList();
        CategoryResponse response = new CategoryResponse(dtos, categoryPage.getNumber(),categoryPage.getSize(),categoryPage.getTotalElements(),categoryPage.getTotalPages(),categoryPage.isLast());
        return response;
    }

    @Override
    public CategoryDTO createNewCategory(CategoryDTO categoryDTO) {
        Category category = modelMapper.map(categoryDTO,Category.class);
        category.setCategoryId(null);
        Category foundCategory = repository.findByCategoryName(category.getCategoryName());
        if(foundCategory != null)
            throw new APIException(HttpStatus.CONFLICT,"Category with name "+category.getCategoryName()+" exists!");

        Category savedCategory = repository.save(category);
        return modelMapper.map(savedCategory,CategoryDTO.class);
    }

    @Override
    public String deteleCategory(Long categoryId) {
        Optional<Category> category = repository.findById(categoryId);
        if(category.isPresent()) {
            repository.deleteById(categoryId);
            return "Successfully remove category with id "+ categoryId;
        }
        throw new APIException(HttpStatus.NOT_FOUND,"Resource not found");
    }

    @Override
    public CategoryDTO updateCategory(Long categoryId,CategoryDTO categoryDTO) {
        Category category = modelMapper.map(categoryDTO,Category.class);
        Optional<Category> matchingCategory = repository.findById(categoryId);
        if(matchingCategory.isEmpty())
            throw new APIException(HttpStatus.NOT_FOUND, "Category with id " + categoryId.toString() + " not found");
        Category category1  = matchingCategory.get();
        category1.setCategoryName(category.getCategoryName());
        Category savedCategory = repository.save(category1);
        return modelMapper.map(savedCategory,CategoryDTO.class);
    }
}
