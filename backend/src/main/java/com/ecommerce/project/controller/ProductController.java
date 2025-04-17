package com.ecommerce.project.controller;

import com.ecommerce.project.config.AppConstant;
import com.ecommerce.project.payload.ProductDTO;
import com.ecommerce.project.payload.ProductResponse;
import com.ecommerce.project.service.ProductService;
import com.ecommerce.project.service.ProductServiceImp;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping(value="public/products")
    public ResponseEntity<ProductResponse> getAllProducts(
            @RequestParam(name = "keyword", required = false) String keyword,
            @RequestParam(name = "category", required = false) String category,
            @RequestParam(required = false,defaultValue = AppConstant.PAGE_NUMBER) Integer pageNum,
            @RequestParam(required = false,defaultValue = AppConstant.PAGE_SIZE) Integer pageSize,
            @RequestParam(required = false,defaultValue = AppConstant.PRODUCT_SORT_BY) String sortBy,
            @RequestParam(required = false,defaultValue = AppConstant.SORT_ORDER) String sortOrder
    ){
        ProductResponse response = productService.getAllProducts(keyword,category,pageNum,pageSize,sortBy,sortOrder);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping(value="public/products/{productId}")
    public ResponseEntity<ProductDTO> getProductById(
           @PathVariable Long productId
    ){
        ProductDTO response = productService.getProductById(productId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }



    @GetMapping(value="public/categories/{categoryId}/products")
    public ResponseEntity<ProductResponse> getProductByCategory(
            @PathVariable Long categoryId,
            @RequestParam(required = false,defaultValue = AppConstant.PAGE_NUMBER) Integer pageNum,
            @RequestParam(required = false,defaultValue = AppConstant.PAGE_SIZE) Integer pageSize,
            @RequestParam(required = false,defaultValue = AppConstant.PRODUCT_SORT_BY) String sortBy,
            @RequestParam(required = false,defaultValue = AppConstant.SORT_ORDER) String sortOrder
    ){
        ProductResponse response = productService.getProductByCategory(categoryId,pageNum,pageSize,sortBy,sortOrder);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping(value="public/products/keyword/{keyword}")
    public ResponseEntity<ProductResponse> getProductByKeyword(
            @PathVariable String keyword,
            @RequestParam(required = false,defaultValue = AppConstant.PAGE_NUMBER) Integer pageNum,
            @RequestParam(required = false,defaultValue = AppConstant.PAGE_SIZE) Integer pageSize,
            @RequestParam(required = false,defaultValue = AppConstant.PRODUCT_SORT_BY) String sortBy,
            @RequestParam(required = false,defaultValue = AppConstant.SORT_ORDER) String sortOrder
    ){
        ProductResponse response = productService.getProductByKeyword(keyword,pageNum,pageSize,sortBy,sortOrder);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping(value="admin/categories/{categoryId}/product")
    public ResponseEntity<ProductDTO> addProduct(@PathVariable Long categoryId,@Valid @RequestBody ProductDTO productDTO){
        ProductDTO response = productService.addProduct(categoryId,productDTO);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PutMapping(value="products/{productId}")
    public ResponseEntity<ProductDTO> updateProduct(@PathVariable Long productId,@Valid @RequestBody ProductDTO productDTO){
        ProductDTO response = productService.updateProduct(productId,productDTO);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping(value="admin/products/{productId}")
    public ResponseEntity<ProductDTO> deleteProduct(@PathVariable Long productId){
        ProductDTO response = productService.deleteProduct(productId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/products/{productId}/image")
    public ResponseEntity<ProductDTO> uploadProductImage(@PathVariable Long productId, @RequestParam MultipartFile file) throws IOException {
        ProductDTO response = productService.uploadProductImage(productId,file);
        return new ResponseEntity<>(response,HttpStatus.OK);
    }

}
