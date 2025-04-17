package com.ecommerce.project.repositories;

import com.ecommerce.project.model.CartItem;
import com.ecommerce.project.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface CartItemRepository extends JpaRepository<CartItem,Long> {
    @Query("SELECT ci FROM CartItem ci WHERE ci.product.id=?1 AND ci.cart.id=?2")
    Optional<CartItem> findByProductIdAndCartId(Long productId, Long cartId);
}
