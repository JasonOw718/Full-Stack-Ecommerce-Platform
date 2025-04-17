package com.ecommerce.project.service;

import com.ecommerce.project.exceptions.APIException;
import com.ecommerce.project.model.*;
import com.ecommerce.project.payload.OrderDTO;
import com.ecommerce.project.payload.OrderItemDTO;
import com.ecommerce.project.payload.PaymentDTO;
import com.ecommerce.project.payload.ProductDTO;
import com.ecommerce.project.repositories.*;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.time.LocalDate;

@Service
public class OrderServiceImp implements OrderService{

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CartService cartService;

    @Transactional
    @Override
    public OrderDTO placeOrder(String email, Long addressId, String paymentMethod, String pgName, String pgPaymentId, String pgStatus, String pgResponseMessage) {
        Cart cart = cartRepository.findByEmail(email).orElseThrow(()-> new APIException(HttpStatus.NOT_FOUND,"Cart not found"));

        Address address = addressRepository.findById(addressId)
                .orElseThrow(() -> new APIException(HttpStatus.NOT_FOUND,"Address not found"));

        Order order = new Order();
        order.setEmail(email);
        order.setOrderDate(LocalDate.now());
        order.setTotalAmount(cart.getTotalPrice());
        order.setOrderStatus("Order Accepted !");
        order.setAddress(address);

        Payment payment = new Payment(paymentMethod, pgPaymentId, pgStatus, pgResponseMessage, pgName);
        payment.setOrder(order);
        payment = paymentRepository.save(payment);
        order.setPayment(payment);

        Order savedOrder = orderRepository.save(order);

        List<CartItem> cartItems = cart.getCartItems();
        if (cartItems.isEmpty()) {
            throw new APIException(HttpStatus.OK,"Cart is empty");
        }

        List<OrderItem> orderItems = new ArrayList<>();
        for (CartItem cartItem : cartItems) {
            OrderItem orderItem = new OrderItem();
            orderItem.setProduct(cartItem.getProduct());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setDiscount(cartItem.getDiscount());
            orderItem.setOrderedProductPrice(cartItem.getProductPrice());
            orderItem.setOrder(savedOrder);
            orderItems.add(orderItem);
        }

        orderItems = orderItemRepository.saveAll(orderItems);

        Iterator<CartItem> iterator = cart.getCartItems().iterator();
        while (iterator.hasNext()) {
            CartItem item = iterator.next();
            int quantity = item.getQuantity();
            Product product = item.getProduct();

            product.setQuantity(product.getQuantity() - quantity);
            productRepository.save(product);

            iterator.remove();
            cartService.deleteProductFromCart(product.getProductId());
        }


        OrderDTO orderDTO = modelMapper.map(savedOrder, OrderDTO.class);
        orderItems.forEach(item -> orderDTO.getOrderItems().add(modelMapper.map(item, OrderItemDTO.class)));

        orderDTO.setAddressId(addressId);

        return orderDTO;
    }

    @Override
    public List<OrderDTO> getAllOrder(String email) {
        List<Order> orders =  orderRepository.findAllByUserEmail(email);
        return orders.stream().map(o->{
            OrderDTO orderDTO = new OrderDTO();
            List<OrderItemDTO> orderItemDTOS = o.getOrderItems().stream().map(item->{
                OrderItemDTO orderItemDTO = new OrderItemDTO();
                ProductDTO productDTO = modelMapper.map(item.getProduct(),ProductDTO.class);
                orderItemDTO.setOrderItemId(item.getOrderItemId());
                orderItemDTO.setOrderedProductPrice(item.getOrderedProductPrice());
                orderItemDTO.setQuantity(item.getQuantity());
                orderItemDTO.setProduct(productDTO);
                orderItemDTO.setDiscount(item.getDiscount());
                return orderItemDTO;
            }).toList();
            orderDTO.setOrderItems(orderItemDTOS);
            orderDTO.setOrderId(o.getOrderId());
            orderDTO.setOrderStatus(o.getOrderStatus());
            orderDTO.setOrderDate(o.getOrderDate());
            orderDTO.setEmail(o.getEmail());
            PaymentDTO paymentDTO = modelMapper.map(o.getPayment(),PaymentDTO.class);
            orderDTO.setPayment(paymentDTO);
            orderDTO.setOrderDate(o.getOrderDate());
            orderDTO.setTotalAmount(o.getTotalAmount());
            orderDTO.setAddressId(o.getAddress().getAddressId());
            return orderDTO;
        }).toList();
    }
}
