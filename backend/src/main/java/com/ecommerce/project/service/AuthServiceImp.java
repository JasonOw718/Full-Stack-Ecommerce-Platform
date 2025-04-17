package com.ecommerce.project.service;

import com.ecommerce.project.exceptions.APIException;
import com.ecommerce.project.model.AppRole;
import com.ecommerce.project.model.AppUser;
import com.ecommerce.project.model.Role;
import com.ecommerce.project.payload.*;
import com.ecommerce.project.repositories.RoleRepository;
import com.ecommerce.project.repositories.UserRepository;
import com.ecommerce.project.security.JwtUtils;
import com.ecommerce.project.security.services.UserDetailsImp;
import com.ecommerce.project.security.services.UserDetailsServiceImp;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class AuthServiceImp implements AuthService{

    @Autowired
    private UserDetailsServiceImp userDetailsServiceImp;


    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public Map<String, Object> signIn(LoginRequest loginRequest) {
        Authentication authentication;
        authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(),loginRequest.getPassword()));
        UserDetailsImp userDetailsImp = (UserDetailsImp) authentication.getPrincipal();
        ResponseCookie token = jwtUtils.generateJwtCookies(authentication);
        Collection<? extends GrantedAuthority> roles = userDetailsImp.getAuthorities();
        UserInfoResponse userInfoResponse = getUserDetail(userDetailsImp);
        Map<String, Object> response = new HashMap<>();
        response.put("user", userInfoResponse);
        response.put("token", token);

        return response;

    }

    @Override
    public UserDTO signUp(SignUpRequest signupRequest) {

        Optional<AppUser> userByUsername  =  userRepository.findByUsername(signupRequest.getUsername());
        if(userByUsername.isPresent())
            throw new APIException(HttpStatus.CONFLICT,"User with username "+signupRequest.getUsername()+" already exists.");
        Optional<AppUser> userByEmail  =  userRepository.findByEmail(signupRequest.getEmail());
        if(userByEmail.isPresent())
            throw new APIException(HttpStatus.CONFLICT,"User with email "+signupRequest.getEmail()+" already exists.");

        AppUser user = new AppUser(signupRequest.getUsername(), passwordEncoder.encode(signupRequest.getPassword()), signupRequest.getEmail());

        Set<String> roles = signupRequest.getRoles();
        Set<Role> mappedRoles = new HashSet<>();

        if(roles == null){
            Role userRole =  roleRepository.findByRole(AppRole.ROLE_USER).orElseThrow(
                    ()-> new APIException(HttpStatus.NOT_FOUND,"User role is not found.")
            );
            mappedRoles.add(userRole);
        }else{
            roles.forEach(
                    role ->{
                        switch(role){
                            case "admin": {
                                Role adminRole =  roleRepository.findByRole(AppRole.ROLE_ADMIN).orElseThrow(
                                        ()-> new APIException(HttpStatus.NOT_FOUND,"Admin role is not found.")
                                );
                                mappedRoles.add(adminRole);
                                break;
                            }
                            case "seller": {
                                Role sellerRole =  roleRepository.findByRole(AppRole.ROLE_SELLER).orElseThrow(
                                        ()-> new APIException(HttpStatus.NOT_FOUND,"Seller role is not found.")
                                );
                                mappedRoles.add(sellerRole);
                                break;

                            }
                            default: {
                                Role userRole =  roleRepository.findByRole(AppRole.ROLE_USER).orElseThrow(
                                        ()-> new APIException(HttpStatus.NOT_FOUND,"User role is not found.")
                                );
                                mappedRoles.add(userRole);

                            }
                        }
                    }
            );
        }
        user.setRoles(mappedRoles);

        return modelMapper.map(userRepository.save(user),UserDTO.class);
    }

    @Override
    public ResponseCookie logOut() {
        return jwtUtils.deleteJwtCookies();
    }

    @Override
    public UserInfoResponse getUserDetail(UserDetailsImp userDetailsImp) {
        AppUser user = userRepository.findByUsername(userDetailsImp.getUsername()).orElseThrow(()-> new APIException(HttpStatus.NOT_FOUND,"USER NOT FOUND"));

        return modelMapper.map(user,UserInfoResponse.class);
    }
}
