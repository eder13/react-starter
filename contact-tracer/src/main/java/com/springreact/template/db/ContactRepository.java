package com.springreact.template.db;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.Optional;

public interface ContactRepository extends PagingAndSortingRepository<Contact, Long> {

    // query for checking if the contact belongs to the user
    @RestResource(exported = false)
    @Query(value = "SELECT u.user.id FROM Contact u WHERE u.user = :user AND u.id = :id")
    Long getContactByUserAndId (
            @Param("user") User user,
            @Param("id") Long id
    );

    /** Restricting Method Based access */

    // only allow getting own contact (=protecting own endpoints in one to many fashion)
    @PreAuthorize("@accessHandler.isOwner(authentication, #id) or @accessHandler.isAdmin(authentication)")
    @Override
    Optional<Contact> findById(Long id);
}
