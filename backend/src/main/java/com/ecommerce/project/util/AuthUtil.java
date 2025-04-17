package com.ecommerce.project.util;

import com.ecommerce.project.model.AppUser;
import com.ecommerce.project.security.services.UserDetailsImp;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.orm.hibernate5.SpringSessionContext;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class AuthUtil {


    @Autowired
    private ModelMapper modelMapper;

    public String loggedEmail(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImp userDetailsImp = (UserDetailsImp) authentication.getPrincipal();
        return userDetailsImp.getEmail();
    }

    public AppUser loggedUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImp userDetailsImp = (UserDetailsImp) authentication.getPrincipal();
        return modelMapper.map(userDetailsImp, AppUser.class);
    }
}
