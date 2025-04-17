package com.ecommerce.project.service;

import com.ecommerce.project.payload.CartDTO;
import jakarta.transaction.Transactional;

import java.util.List;

public interface CartService {
    List<CartDTO> getAllCarts();

    CartDTO addProductToCart(Long productId, int quantity);

    CartDTO getUserCart();

    CartDTO updateProductQuantity(Long productId, int quantity);

    @Transactional
    CartDTO deleteProductFromCart(Long productId);
}
