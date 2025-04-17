package com.ecommerce.project.controller;

import com.ecommerce.project.model.AppUser;
import com.ecommerce.project.payload.CartDTO;
import com.ecommerce.project.payload.OrderDTO;
import com.ecommerce.project.payload.OrderRequestDTO;
import com.ecommerce.project.service.OrderService;
import com.ecommerce.project.service.StripeService;
import com.ecommerce.project.util.AuthUtil;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.model.checkout.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/api")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private StripeService stripeService;

    @Autowired
    private AuthUtil authUtil;

    @PostMapping("/order/users/payments/{paymentMethod}")
    public ResponseEntity<OrderDTO> orderProducts(@PathVariable String paymentMethod, @RequestBody OrderRequestDTO orderRequestDTO){
        String email = authUtil.loggedEmail();
        return new ResponseEntity<>(orderService.placeOrder(email,orderRequestDTO.getAddressId(),paymentMethod, orderRequestDTO.getPgName(), orderRequestDTO.getPgPaymentId(), orderRequestDTO.getPgStatus(),orderRequestDTO.getPgResponseMessage()), HttpStatus.OK);
    }

    @PostMapping("/stripe/checkout/payment-intent")
    public ResponseEntity<?> createPaymentIntent(@RequestBody CartDTO cart) throws StripeException {

        PaymentIntent paymentIntent = stripeService.createPaymentIntent((long) cart.getTotalPrice());
        HashMap<String,String> response = new HashMap<>();
        response.put("id",paymentIntent.getId());
        response.put("clientSecret", paymentIntent.getClientSecret());
        return new ResponseEntity<>(response,HttpStatus.OK);
    }


    @GetMapping("/stripe/payment-intent/{paymentIntentId}")
    public ResponseEntity<String> getPaymentIntent(@PathVariable String paymentIntentId) throws StripeException {
        PaymentIntent paymentIntent= stripeService.getPaymentIntent(paymentIntentId);

        return new ResponseEntity<>(paymentIntent.getStatus(),HttpStatus.OK);
    }


    @GetMapping("/order/user")
    public ResponseEntity<List<OrderDTO>> getUserOrders(){
        List<OrderDTO> orders =  orderService.getAllOrder(authUtil.loggedEmail());
        return new ResponseEntity<>(orders,HttpStatus.OK);
    }

}
