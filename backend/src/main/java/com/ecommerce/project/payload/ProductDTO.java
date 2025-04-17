package com.ecommerce.project.payload;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTO {
    private Long productId;
    @NotBlank(message = "product name cannot blank")
    @Size(min=5,max=20)
    private String productName;
    private String description;
    private String image;
    private Integer quantity;
    private double price;
    private double specialPrice;
}