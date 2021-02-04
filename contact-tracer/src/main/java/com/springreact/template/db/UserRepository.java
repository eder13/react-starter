package com.springreact.template.db;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.Optional;

public interface UserRepository extends PagingAndSortingRepository<User, Long> {

    /** General fine-grained Queries */

    // query for getting a user by providing the email (saved in spring on authentication)
    @Query(value = "SELECT u FROM User u WHERE u.email = :email")
    User findUserByEmail(
            @Param("email") String email
    );

    /** Restricting Method Based access */

    // GET-ting all available users only for admins (1) (GET)
    @PreAuthorize("@accessHandler.isAdmin(authentication)")
    @Override
    Iterable<User> findAll(Sort sort);

    // GET-ting all available users only for admins (2) (GET)
    @PreAuthorize("@accessHandler.isAdmin(authentication)")
    @Override
    Page<User> findAll(Pageable pageable);

    // allow user only access to his own endpoint (GET)
    @PreAuthorize("@accessHandler.isAllowed(authentication, #id)")
    @Override
    Optional<User> findById(Long id);

    /** Disabled Methods for the client */

    // disable saveAll generally (POST)
    @Override
    @RestResource(exported = false)
    <S extends User> Iterable<S> saveAll(Iterable<S> var1);

    /** Methods that are not restricted at all */

    // long count();
}