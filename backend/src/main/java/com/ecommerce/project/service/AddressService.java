package com.ecommerce.project.service;

import com.ecommerce.project.model.AppUser;
import com.ecommerce.project.payload.AddressDTO;

import java.util.List;

public interface AddressService {

    AddressDTO createAddress(AppUser user, AddressDTO addressDTO);

    List<AddressDTO> getAllAddress();

    AddressDTO getAddressById(Long id);

    List<AddressDTO> getAddressByUser(AppUser user);

    AddressDTO updateAddress(AddressDTO addressDTO, Long id);

    void deleteAddress(AppUser user, Long id);
}
