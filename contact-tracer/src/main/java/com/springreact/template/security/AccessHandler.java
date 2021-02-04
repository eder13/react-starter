package com.springreact.template.security;

import com.springreact.template.db.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;

import java.security.Principal;
import java.util.Collection;

@Component
public class AccessHandler {

    private final UserRepository userRepository;

    public AccessHandler(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public boolean isAllowed(Authentication a, Long id) {

        if (a instanceof OAuth2AuthenticationToken) {
            // get email of currently logged in user
            OAuth2User oauth2user = ((OAuth2AuthenticationToken) a).getPrincipal();
            String email = oauth2user.getAttribute("email");

            // get id of logged in user and check if that id equals to the endpoint id which is given as Parameter
            return userRepository.findUserByEmail(email).getUserID().equals(id);
        } else {
            // no OAuth2 User -> no login
            return false;
        }
    }

    public boolean isAdmin(Authentication a) {
        return a.getAuthorities().stream()
                .anyMatch(r -> r.getAuthority().equals("ROLE_ADMIN"));
    }

    //    public boolean isTestUser(Authentication a) {
    //        // Check e.g. if has "ROLE_TEST" applied
    //    }
}
