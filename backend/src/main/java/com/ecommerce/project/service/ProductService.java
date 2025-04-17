package com.ecommerce.project.service;

import com.ecommerce.project.payload.ProductDTO;
import com.ecommerce.project.payload.ProductResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ProductService {

    ProductResponse getAllProducts(String keyword, String category, Integer pageNum, Integer pageSize, String sortBy, String sortOrder);

    ProductDTO addProduct(Long categoryId, ProductDTO productDTO);

    ProductResponse getProductByKeyword(String keyword, Integer pageNum, Integer pageSize, String sortBy, String sortOrder);

    ProductResponse getProductByCategory(Long categoryId, Integer pageNum, Integer pageSize, String sortBy, String sortOrder);

    ProductDTO updateProduct(Long productId, ProductDTO productDTO);

    ProductDTO deleteProduct(Long productId);

    ProductDTO uploadProductImage(Long productId, MultipartFile file) throws IOException;

    ProductDTO getProductById(Long productId);
}
