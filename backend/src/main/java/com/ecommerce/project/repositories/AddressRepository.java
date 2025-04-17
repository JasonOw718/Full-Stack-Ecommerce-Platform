package com.ecommerce.project.repositories;

import com.ecommerce.project.model.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface AddressRepository extends JpaRepository<Address,Long> {
    @Query("SELECT a FROM Address a JOIN a.user u WHERE u.userId = ?1")
    List<Address> findByUserId(Long userId);

    @Query("SELECT a FROM Address a JOIN a.user u WHERE u.userId = ?1 AND a.addressId = ?2")
    Optional<Address> findByUserIdAndAddressId(Long userId, Long addressId);
}
