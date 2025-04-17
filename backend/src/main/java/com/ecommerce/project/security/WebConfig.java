package com.ecommerce.project.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Value("${frontend.url}")
    private String frontendUrl;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Allow all origins for all endpoints (you can restrict to specific URLs as needed)
        registry.addMapping("/**")
                .allowedOrigins(frontendUrl)  // Modify this as needed
                .allowedMethods("GET", "POST", "PUT", "DELETE","OPTIONS")  // Define allowed HTTP methods
                .allowedHeaders("*")  // Allow all headers
                .allowCredentials(true);

    }
}