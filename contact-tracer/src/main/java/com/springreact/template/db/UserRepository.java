package com.springreact.template.db;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends PagingAndSortingRepository<User, Long> {

    @Query(value = "SELECT u FROM User u WHERE u.email = :email")
    User findUserByEmail(
            @Param("email") String email
    );


}
