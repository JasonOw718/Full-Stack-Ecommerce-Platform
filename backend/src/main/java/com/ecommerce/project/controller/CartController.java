package com.ecommerce.project.controller;

import com.ecommerce.project.payload.CartDTO;
import com.ecommerce.project.service.CartService;
import com.ecommerce.project.util.AuthUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    private AuthUtil authUtil;

    @GetMapping("carts")
    public ResponseEntity<List<CartDTO>> getAllCarts(){
        return new ResponseEntity<>(cartService.getAllCarts(), HttpStatus.OK);
    }

    @PostMapping("carts/products/{productId}/quantity/{quantity}")
    public ResponseEntity<CartDTO> addProductToCart(@PathVariable Long productId,@PathVariable int quantity){
        return new ResponseEntity<>(cartService.addProductToCart(productId,quantity),HttpStatus.OK);
    }

    @GetMapping("carts/users/cart")
    public ResponseEntity<CartDTO> getUserCart(){
        return new ResponseEntity<>(cartService.getUserCart(),HttpStatus.OK);
    }

    @PutMapping("cart/products/{productId}/quantity/{operation}")
    public ResponseEntity<CartDTO> updateProductQuantity(@PathVariable Long productId,@PathVariable String operation){
        return new ResponseEntity<>(cartService.updateProductQuantity(productId,operation.equalsIgnoreCase("delete")?-1:1),HttpStatus.OK);
    }

    @DeleteMapping("carts/product/{productId}")
    public ResponseEntity<CartDTO> deleteProductFromCart(@PathVariable Long productId ){
        return new ResponseEntity<>(cartService.deleteProductFromCart(productId),HttpStatus.OK);
    }

}
