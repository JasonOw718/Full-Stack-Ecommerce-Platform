package com.ecommerce.project.service;

import com.ecommerce.project.exceptions.APIException;
import com.ecommerce.project.model.Cart;
import com.ecommerce.project.model.CartItem;
import com.ecommerce.project.model.Product;
import com.ecommerce.project.payload.CartDTO;
import com.ecommerce.project.payload.CartItemDTO;
import com.ecommerce.project.payload.ProductDTO;
import com.ecommerce.project.repositories.CartItemRepository;
import com.ecommerce.project.repositories.CartRepository;
import com.ecommerce.project.repositories.ProductRepository;
import com.ecommerce.project.util.AuthUtil;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.ResourceAccessException;

import java.util.List;
import java.util.Optional;

@Service
public class CartServiceImp implements CartService{

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private AuthUtil authUtil;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Override
    public List<CartDTO> getAllCarts() {
        List<Cart> carts = cartRepository.findAll();
        return carts.stream().map(this::convertToCartDTO).toList();
    }


    @Override
    public CartDTO addProductToCart(Long productId, int quantity) {
        Cart cart = createCart(authUtil.loggedEmail());
        Product matchedProduct = productRepository.findById(productId)
                .orElseThrow(() -> new APIException(HttpStatus.NOT_FOUND, "Product with id " + productId + " is not found."));

        Optional<CartItem> matchedItem = cartItemRepository.findByProductIdAndCartId(matchedProduct.getProductId(), cart.getCartId());
        if (matchedItem.isPresent())
            throw new APIException(HttpStatus.CONFLICT, "Product with id " + productId + " already exists");

        if (matchedProduct.getQuantity() < quantity)
            throw new APIException(HttpStatus.BAD_REQUEST, "You have exceeded product quantity");

        CartItem item = new CartItem(matchedProduct.getDiscount(), matchedProduct.getSpecialPrice(), quantity, matchedProduct, cart);
        CartItem savedItem = cartItemRepository.save(item);
        cart.getCartItems().add(savedItem);
        cart.setTotalPrice(cart.getTotalPrice() + (item.getProductPrice() * quantity));

        return convertToCartDTO(cartRepository.save(cart));
    }


    @Override
    public CartDTO getUserCart() {
        return convertToCartDTO(createCart(authUtil.loggedEmail()));
    }

    @Override
    @Transactional
    public CartDTO updateProductQuantity(Long productId, int quantity) {
        Cart cart = createCart(authUtil.loggedEmail());
        Product matchingProduct = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceAccessException("Product is not found."));

        Optional<CartItem> item = cartItemRepository.findByProductIdAndCartId(productId, cart.getCartId());
        if (item.isEmpty())
            throw new APIException(HttpStatus.BAD_REQUEST, "Cart item is not found.");

        CartItem cartItem = item.get();
        int totalQuantity = cartItem.getQuantity() + quantity;

        if (totalQuantity > matchingProduct.getQuantity())
            throw new APIException(HttpStatus.BAD_REQUEST, "Stock for product with id " + productId + " is not enough.");

        cartItem.setQuantity(totalQuantity);
        cartItemRepository.save(cartItem);

        if (totalQuantity == 0)
            cartItemRepository.deleteById(cartItem.getCartItemId());

        cart.setTotalPrice(cart.getTotalPrice() + (cartItem.getProductPrice() * quantity));
        return convertToCartDTO(cartRepository.save(cart));
    }


    @Transactional
    @Override
    public CartDTO deleteProductFromCart(Long productId){
        Cart cart = createCart(authUtil.loggedEmail());
        boolean isExist = productRepository.existsById(productId);
        if(isExist) {
            CartItem item = cartItemRepository.findByProductIdAndCartId(productId, cart.getCartId()).orElseThrow(() -> new APIException(HttpStatus.NOT_FOUND, "Cart Item is not found."));
            cart.setTotalPrice(cart.getTotalPrice() - (item.getProductPrice()) * item.getQuantity());
            cart.getCartItems().remove(item);
            cartItemRepository.deleteById(item.getCartItemId());
            return convertToCartDTO(cartRepository.save(cart));
        }else
            throw new APIException(HttpStatus.NOT_FOUND, "Product is not found.");
    }



    private Cart createCart(String email){
        Optional<Cart> matchingCart =  cartRepository.findByEmail(email);
        if(matchingCart.isEmpty()){
            Cart cart = new Cart();
            cart.setUser(authUtil.loggedUser());
            return cartRepository.save(cart);
        }
        return matchingCart.get();
    }

    private CartDTO convertToCartDTO(Cart cart) {
        CartDTO cartDTO = new CartDTO();
        List<CartItemDTO> itemListDtos = cart.getCartItems().stream().map(c -> {
            ProductDTO productDTO = modelMapper.map(c.getProduct(), ProductDTO.class);
            CartItemDTO cartItemDTO = new CartItemDTO();
            cartItemDTO.setQuantity(c.getQuantity());
            cartItemDTO.setImage(productDTO.getImage());
            cartItemDTO.setDescription(productDTO.getDescription());
            cartItemDTO.setPrice(productDTO.getSpecialPrice());
            cartItemDTO.setProductName(productDTO.getProductName());
            cartItemDTO.setSpecialPrice(productDTO.getSpecialPrice());
            cartItemDTO.setProductId(productDTO.getProductId());
            return cartItemDTO;
        }).toList();
        cartDTO.setCartItems(itemListDtos);
        cartDTO.setTotalPrice(cart.getTotalPrice());
        cartDTO.setCartId(cart.getCartId());
        return cartDTO;
    }
}
