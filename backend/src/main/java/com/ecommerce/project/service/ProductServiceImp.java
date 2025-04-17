package com.ecommerce.project.service;

import com.ecommerce.project.exceptions.APIException;
import com.ecommerce.project.model.Category;
import com.ecommerce.project.model.Product;
import com.ecommerce.project.payload.ProductDTO;
import com.ecommerce.project.payload.ProductResponse;
import com.ecommerce.project.repositories.CategoryRepository;
import com.ecommerce.project.repositories.ProductRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImp implements ProductService{
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private FileServiceImp fileService;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private ModelMapper mapper;

    @Value("${image.path}")
    private String path;

    @Value("${base.url}")
    private String baseUrl;

    @Override
    public ProductResponse getAllProducts(String keyword, String category, Integer pageNum, Integer pageSize, String sortBy, String sortOrder) {
        Specification<Product> spec = Specification.where(null);
        if (keyword != null && !keyword.isEmpty()) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.like(criteriaBuilder.lower(root.get("productName")), "%" + keyword.toLowerCase() + "%"));
        }

        if (category != null && !category.isEmpty()) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.like(root.get("category").get("categoryName"), category));
        }
        Sort sort = Sort.by(sortBy);
        Sort sort2 = sortOrder.equalsIgnoreCase("asc")?sort.ascending():sort.descending();
        Pageable pageDetail = PageRequest.of(pageNum,pageSize,sort2);
        Page<Product> pages =  productRepository.findAll(spec,pageDetail);
        List<Product> products = pages.getContent();
        if(products.isEmpty()) throw new APIException(HttpStatus.OK,"product is empty.");
        List<ProductDTO> dtos = products.stream().map(product-> mapper.map(product, ProductDTO.class)).toList();
        ProductResponse response = new ProductResponse(dtos);
        response.setTotalElements(pages.getTotalElements());
        response.setTotalPages(pages.getTotalPages());
        response.setPageSize(pages.getSize());
        response.setPageNumber(pages.getNumber());
        response.setLastPage(pages.isLast());
        return response;
    }

    @Override
    public ProductDTO addProduct(Long categoryId, ProductDTO productDTO) {
        Category category = categoryRepository.findById(categoryId).orElseThrow(()-> new APIException(HttpStatus.NOT_FOUND,"Category with id "+ categoryId.toString()+" does not exists"));
        List<Product> products = category.getProducts();
        boolean isExist = products.stream()
                .anyMatch(product -> product.getProductName().equals(productDTO.getProductName()));
        if(isExist) throw new APIException(HttpStatus.CONFLICT,"Product already exists");

        Product product = mapper.map(productDTO,Product.class);
        product.setCategory(category);
        product.setImage(formatImagePath(product.getImage()));
        double specialPrice = product.getPrice() -
                ((product.getDiscount() * 0.01) * product.getPrice());
        product.setSpecialPrice(specialPrice);
        Product savedProduct = productRepository.save(product);

        return mapper.map(savedProduct, ProductDTO.class);
    }

    @Override
    public ProductResponse getProductByKeyword(String keyword, Integer pageNum, Integer pageSize, String sortBy, String sortOrder) {
        Sort sort = sortOrder.equalsIgnoreCase("asc")?Sort.by(sortBy).ascending(): Sort.by(sortBy).descending();
        Pageable pageDetails = PageRequest.of(pageNum,pageSize,sort);
        Page<Product> pages = productRepository.findByProductNameLikeIgnoreCase("%"+keyword+"%",pageDetails);
        List<Product> products =  pages.getContent();
        if(products.isEmpty()) throw new APIException(HttpStatus.OK,"product is empty.");
        List<ProductDTO> dtos = products.stream().map(product-> mapper.map(product, ProductDTO.class)).toList();
        ProductResponse response = new ProductResponse(dtos);
        response.setTotalElements(pages.getTotalElements());
        response.setTotalPages(pages.getTotalPages());
        response.setPageSize(pages.getSize());
        response.setPageNumber(pages.getNumber());
        response.setLastPage(pages.isLast());
        return response;
    }

    @Override
    public ProductDTO getProductById(Long productId) {
         Product product = productRepository.findById(productId).orElseThrow(()-> new APIException(HttpStatus.NOT_FOUND,"Product is not found"));
         return modelMapper.map(product,ProductDTO.class);
    }

    @Override
    public ProductResponse getProductByCategory(Long categoryId, Integer pageNum, Integer pageSize, String sortBy, String sortOrder) {
        Optional<Category> category = categoryRepository.findById(categoryId);
        if(category.isPresent()){
            Sort sort = sortOrder.equalsIgnoreCase("asc")?Sort.by(sortBy).ascending(): Sort.by(sortBy).descending();
            Pageable pageDetails = PageRequest.of(pageNum,pageSize,sort);
            Page<Product> pages = productRepository.findAllByCategoryOrderByPriceAsc(category.get(),pageDetails);
            List<Product> products =  pages.getContent();
            if(products.isEmpty()) throw new APIException(HttpStatus.OK,"product is empty.");
            List<ProductDTO> dtos = products.stream().map(product-> mapper.map(product, ProductDTO.class)).toList();
            ProductResponse response = new ProductResponse(dtos);
            response.setTotalElements(pages.getTotalElements());
            response.setTotalPages(pages.getTotalPages());
            response.setPageSize(pages.getSize());
            response.setPageNumber(pages.getNumber());
            response.setLastPage(pages.isLast());
            return response;
        }else throw new APIException(HttpStatus.NOT_FOUND,"category with id "+ categoryId.toString()+ " not found");
    }

    @Override
    public ProductDTO updateProduct(Long productId, ProductDTO productDTO) {
        Product matchProduct = productRepository.findById(productId).orElseThrow(()-> new APIException(HttpStatus.NOT_FOUND,"product with id "+ productId.toString()+" not found."));
        matchProduct.setProductName(productDTO.getProductName());
        matchProduct.setDescription(productDTO.getDescription());
        matchProduct.setPrice(productDTO.getPrice());
        matchProduct.setSpecialPrice(productDTO.getSpecialPrice());
        matchProduct.setQuantity(productDTO.getQuantity());
        matchProduct.setImage(formatImagePath(productDTO.getImage()));
        Product updatedProduct = productRepository.save(matchProduct);
        return mapper.map(updatedProduct,ProductDTO.class);

    }

    @Override
    public ProductDTO deleteProduct(Long productId) {
        Product product = productRepository.findById(productId).orElseThrow(()-> new APIException(HttpStatus.NOT_FOUND,"product with id "+ productId.toString()+" not found."));
        productRepository.delete(product);
        return mapper.map(product,ProductDTO.class);

    }

    @Override
    public ProductDTO uploadProductImage(Long productId, MultipartFile file) throws IOException {
        String filename = fileService.uploadImage(path,file).replace("images/", "");

        Product product = productRepository.findById(productId).orElseThrow(()-> new APIException(HttpStatus.NOT_FOUND,"Product with id "+productId+" not found"));

        product.setImage(formatImagePath(filename));
        Product savedProduct = productRepository.save(product);
        return mapper.map(savedProduct,ProductDTO.class);
    }

    public String formatImagePath(String path){
        String imagePath = baseUrl.endsWith("/")?baseUrl+ path:baseUrl+ '/' + path;
        return imagePath;
    }

}
