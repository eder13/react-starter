package com.springreact.template.db;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Integer> {
    @Query(value = "SELECT u FROM User u")
    List<User> listAllUsers();

    // find id by email
    @Query(value = "SELECT u FROM User u WHERE u.email = :email")
    User findUserByEmail(
            @Param("email") String email
    );
}
