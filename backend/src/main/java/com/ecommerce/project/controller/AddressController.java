package com.ecommerce.project.controller;

import com.ecommerce.project.model.AppUser;
import com.ecommerce.project.payload.AddressDTO;
import com.ecommerce.project.service.AddressService;
import com.ecommerce.project.util.AuthUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class AddressController {
    @Autowired
    private AddressService addressService;

    @Autowired
    private AuthUtil authUtil;

    @PostMapping("addresses")
    public ResponseEntity<AddressDTO> createAddress(@RequestBody AddressDTO addressDTO){
        AppUser user = authUtil.loggedUser();
        return new ResponseEntity<>(addressService.createAddress(user,addressDTO), HttpStatus.CREATED);
    }

    @GetMapping("addresses")
    public ResponseEntity<List<AddressDTO>> getAddresses(){
        return new ResponseEntity<>(addressService.getAllAddress(), HttpStatus.OK);
    }

    @GetMapping("addresses/{addressId}")
    public ResponseEntity<AddressDTO> getAddressById(@PathVariable Long addressId){
        return new ResponseEntity<>(addressService.getAddressById(addressId), HttpStatus.OK);
    }

    @GetMapping("users/addresses")
    public ResponseEntity<List<AddressDTO>> getAddressesByUser(){
        AppUser currentUser = authUtil.loggedUser();
        return new ResponseEntity<>(addressService.getAddressByUser(currentUser), HttpStatus.OK);
    }

    @PutMapping("addresses/{addressId}")
    public ResponseEntity<AddressDTO> updateAddress(@RequestBody AddressDTO addressDTO,@PathVariable Long addressId){
        return new ResponseEntity<>(addressService.updateAddress(addressDTO,addressId), HttpStatus.OK);
    }

    @DeleteMapping("addresses/{addressId}")
    public ResponseEntity<String> deleteAddress(@PathVariable Long addressId){
        AppUser currentUser = authUtil.loggedUser();
        addressService.deleteAddress(currentUser,addressId);
        return new ResponseEntity<>("Address with id "+ addressId +" deleted successfully", HttpStatus.OK);
    }
}
