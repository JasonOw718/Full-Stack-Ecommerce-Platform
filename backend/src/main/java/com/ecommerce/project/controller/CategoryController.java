package com.ecommerce.project.controller;

import com.ecommerce.project.config.AppConstant;
import com.ecommerce.project.model.Category;
import com.ecommerce.project.payload.CategoryDTO;
import com.ecommerce.project.payload.CategoryResponse;
import com.ecommerce.project.service.CategoryService;
import jakarta.validation.Valid;
import org.apache.coyote.Request;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class CategoryController {
    private CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }


    @GetMapping("public/categories")
    public ResponseEntity<CategoryResponse> getAllCategories(@RequestParam(name="pageNumber",defaultValue = AppConstant.PAGE_NUMBER, required = false) Integer pageNumber,
                                                             @RequestParam(name="pageSize",defaultValue = AppConstant.PAGE_SIZE, required = false) Integer pageSize,
                                                             @RequestParam(name="sortBy",defaultValue = AppConstant.CATEGORY_SORT_BY,required=false) String sortBy,
                                                             @RequestParam(name="sortOrder",defaultValue = AppConstant.SORT_ORDER,required=false) String sortOrder
                                                             ) {
        return new ResponseEntity<>(categoryService.getAllCategories(pageNumber,pageSize,sortBy,sortOrder), HttpStatus.OK);
    }

    @PostMapping("public/categories")
    public ResponseEntity<CategoryDTO> createNewCategory(@Valid @RequestBody CategoryDTO categoryDTO) {
        CategoryDTO dto = categoryService.createNewCategory(categoryDTO);
        return new ResponseEntity<>(dto, HttpStatus.CREATED);
    }

    @DeleteMapping("admin/categories/{categoryId}")
    public ResponseEntity<String> deleteCategory(@PathVariable Long categoryId) {
        return new ResponseEntity<>(categoryService.deteleCategory(categoryId), HttpStatus.OK);
    }

    @RequestMapping(value = "public/categories/{categoryId}", method = RequestMethod.PUT)
    public ResponseEntity<CategoryDTO> updateCategory(@PathVariable Long categoryId, @Valid @RequestBody CategoryDTO categoryDTO) {

        return new ResponseEntity<>(categoryService.updateCategory(categoryId, categoryDTO), HttpStatus.OK);

    }
}
