package com.ecommerce.project.service;

import com.ecommerce.project.payload.CartDTO;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.model.checkout.Session;

public interface StripeService {

    PaymentIntent createPaymentIntent(Long totalAmount) throws StripeException;

    PaymentIntent getPaymentIntent(String paymentIntentId) throws StripeException;
}
