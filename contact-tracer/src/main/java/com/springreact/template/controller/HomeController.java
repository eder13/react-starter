package com.springreact.template.controller;

import com.springreact.template.db.User;
import com.springreact.template.db.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.Collections;
import java.util.Map;

@Controller
public class HomeController {

    @Autowired
    private UserRepository userRepository;

    @RequestMapping(value = "/")
    public String index() {
        return "index";
    }

    @ResponseBody
    @GetMapping("/user")
    public Map<String, Object> user(@AuthenticationPrincipal OAuth2User principal) {
        return Collections.singletonMap("email", principal.getAttribute("email"));
    }

    @ResponseBody
    @GetMapping("/userid")
    public String userId(@RequestParam("email") String email) {

        User user = userRepository.findUserByEmail(email);
        if (user != null) {
            return "{" +
                    "\"id\": " + user.getUserID() +
                    "}";
        } else {
            return "{" +
                    "\"error\": " + "\"UserId not found\"" +
                    "}";
        }
    }

    @ResponseBody
    @GetMapping("/error")
    public String error(HttpServletRequest httpServletRequest) {
        String message = (String) httpServletRequest.getSession().getAttribute("error.message");
        httpServletRequest.getSession().removeAttribute("error.message");
        return message;
    }
}