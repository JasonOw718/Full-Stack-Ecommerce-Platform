package com.ecommerce.project.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cartItemId;
    private double discount;
    private double productPrice;
    private int quantity;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "cart_id")
    private Cart cart;

    @ManyToOne
    @JoinColumn(name="product_id")
    private Product product;

    public CartItem(double discount, double productPrice, int quantity, Product product, Cart cart) {
        this.discount = discount;
        this.productPrice = productPrice;
        this.quantity = quantity;
        this.product = product;
        this.cart = cart;
    }
}
