package com.ecommerce.project.service;

import com.ecommerce.project.exceptions.APIException;
import com.ecommerce.project.model.Address;
import com.ecommerce.project.model.AppUser;
import com.ecommerce.project.payload.AddressDTO;
import com.ecommerce.project.repositories.AddressRepository;
import com.ecommerce.project.repositories.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

@Service
public class AddressServiceImp implements AddressService{
    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public AddressDTO createAddress(AppUser user, AddressDTO addressDTO){
        addressDTO.setAddressId(null);
        Address address = modelMapper.map(addressDTO, Address.class);

        Optional<Address> matchingAddress =  addressRepository.findByUserIdAndAddressId(user.getUserId(),address.getAddressId());
        if(matchingAddress.isPresent())
            throw new APIException(HttpStatus.CONFLICT,"Address with id "+address.getAddressId()+" already exists");
        user.getAddresses().add(address);
        address.setUser(user);
        Address savedAddress = addressRepository.save(address);
        userRepository.save(user);
        return modelMapper.map(savedAddress,AddressDTO.class);
    }

    @Override
    public List<AddressDTO> getAllAddress(){
        List<Address> addresses =  addressRepository.findAll();
        Stream<AddressDTO> addStream = addresses.stream().map(a->modelMapper.map(a, AddressDTO.class));
        return addStream.toList();
    }

    @Override
    public AddressDTO getAddressById(Long id){
        Optional<Address> matchingAddress =  addressRepository.findById(id);
        if(matchingAddress.isPresent())
            return modelMapper.map(matchingAddress.get(),AddressDTO.class);
        throw new APIException(HttpStatus.CONFLICT,"Address with id "+id+" already exists");
    }

    @Override
    public List<AddressDTO> getAddressByUser(AppUser user){
        List<Address> addresses =  addressRepository.findByUserId(user.getUserId());
        Stream<AddressDTO> addStream = addresses.stream().map(a->modelMapper.map(a, AddressDTO.class));
        return addStream.toList();
    }

    @Override
    public AddressDTO updateAddress(AddressDTO addressDTO, Long id){
        Optional<Address> matchingAddress =  addressRepository.findById(id);
        if(matchingAddress.isEmpty())
            throw new APIException(HttpStatus.NOT_FOUND,"Address with id "+id+" is not found");
        Address address = matchingAddress.get();
        address.setCity(addressDTO.getCity());
        address.setBuildingName(addressDTO.getBuildingName());
        Address savedAddress =  addressRepository.save(address);
        return modelMapper.map(savedAddress,AddressDTO.class);
    }

    @Override
    public void deleteAddress(AppUser user, Long id){
        Optional<Address> matchingAddress =  addressRepository.findById(id);
        if(matchingAddress.isEmpty())
            throw new APIException(HttpStatus.NOT_FOUND,"Address with id "+id+" is not found");

        Address address = matchingAddress.get();
        user.getAddresses().remove(address);
        userRepository.save(user);
        addressRepository.delete(address);
    }
}
