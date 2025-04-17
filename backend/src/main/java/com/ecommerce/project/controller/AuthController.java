package com.ecommerce.project.controller;

import com.ecommerce.project.exceptions.APIException;
import com.ecommerce.project.model.AppUser;
import com.ecommerce.project.payload.LoginRequest;
import com.ecommerce.project.payload.SignUpRequest;
import com.ecommerce.project.payload.UserDTO;
import com.ecommerce.project.payload.UserInfoResponse;
import com.ecommerce.project.repositories.UserRepository;
import com.ecommerce.project.security.services.UserDetailsImp;
import com.ecommerce.project.service.AuthService;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;



    @PostMapping("signin")
    public ResponseEntity<?> signIn(@Valid @RequestBody LoginRequest loginRequest){
        try {
            Map<String, Object> response = authService.signIn(loginRequest);
            return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE,
                            response.get("token").toString())
                    .body(response.get("user"));
        }catch (AuthenticationException ex){
            return new ResponseEntity<>(ex.getMessage(),HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("signup")
    public ResponseEntity<UserDTO> signUp(@Valid @RequestBody SignUpRequest signupRequest){
        return new ResponseEntity(authService.signUp(signupRequest),HttpStatus.CREATED);
    }

    @GetMapping("username")
    public String getUsername(Authentication authentication){
        if(authentication == null)
            return "NULL";
        return authentication.getName();
    }

    @GetMapping("user")
    public UserInfoResponse getUser(Authentication authentication){
        UserDetailsImp userDetailsImp = (UserDetailsImp) authentication.getPrincipal();
        UserInfoResponse userInfoResponse = authService.getUserDetail(userDetailsImp);
        return userInfoResponse;
    }

    @PostMapping("logout")
    public ResponseEntity<String> logout(){
        ResponseCookie deletedCookie = authService.logOut();
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE,
                deletedCookie.toString()).body("Logout Successful");
    }

}
