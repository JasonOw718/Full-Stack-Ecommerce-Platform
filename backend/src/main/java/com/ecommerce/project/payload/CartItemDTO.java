package com.ecommerce.project.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartItemDTO {
        private Long productId;
        private String productName;
        private String description;
        private String image;
        private double price;
        private double specialPrice;
        private int quantity;
}
