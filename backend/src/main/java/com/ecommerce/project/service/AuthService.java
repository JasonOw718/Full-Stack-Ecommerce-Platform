package com.ecommerce.project.service;

import com.ecommerce.project.payload.LoginRequest;
import com.ecommerce.project.payload.SignUpRequest;
import com.ecommerce.project.payload.UserDTO;
import com.ecommerce.project.payload.UserInfoResponse;
import com.ecommerce.project.security.services.UserDetailsImp;
import org.springframework.http.ResponseCookie;

import java.util.Map;

public interface AuthService {
    Map<String, Object> signIn(LoginRequest loginRequest);

    UserDTO signUp(SignUpRequest signupRequest);

    ResponseCookie logOut();

    UserInfoResponse getUserDetail(UserDetailsImp userDetailsImp);
}
