package com.springreact.template.security;

import com.springreact.template.db.User;
import com.springreact.template.db.UserRepository;
import com.google.gson.Gson;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Configuration
public class SpringSecurityConfig extends WebSecurityConfigurerAdapter {

    private final UserRepository userRepository;

    public SpringSecurityConfig(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        SimpleUrlAuthenticationFailureHandler handler = new SimpleUrlAuthenticationFailureHandler("/");

        http
                .authorizeRequests(a -> a
                        .antMatchers("/", "/error", "/main.css", "/built/**").permitAll()
                        .anyRequest().authenticated()
                )
                .exceptionHandling(e -> e
                        /// TODO: return a JSON 'not authenticated 401' Response + Reason ('You need to be logged in to use this service')
                        .authenticationEntryPoint(new AuthenticationEntryPoint() {
                            @Override
                            public void commence(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, AuthenticationException e) throws IOException, ServletException {
                                httpServletResponse.setContentType(MediaType.TEXT_HTML_VALUE);
                                httpServletResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                                httpServletResponse.getOutputStream().println("<script>window.location.href = \"http://localhost:8081/\"</script>");
                            }
                        })
                )
                .csrf(c -> c
                        .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                )
                .logout(l -> l
                        .logoutSuccessUrl("/").permitAll()
                )
                .oauth2Login().defaultSuccessUrl("/")
                .successHandler(new SavedRequestAwareAuthenticationSuccessHandler() {
                    @Override
                    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
                        Authentication a = SecurityContextHolder.getContext().getAuthentication();

                        if (a instanceof OAuth2AuthenticationToken) {
                            OAuth2User oauth2user = ((OAuth2AuthenticationToken) a).getPrincipal();

                            // get fields of interest
                            Map<String, Object> map = new HashMap<>();
                            map.put("name", oauth2user.getAttribute("name"));
                            map.put("email", oauth2user.getAttribute("email"));

                            // check if user logs in the first time -> true: save to database
                            if (userRepository.findUserByEmail(map.get("email").toString()) == null) {
                                User user = new User(map.get("name").toString(), map.get("email").toString(), false);
                                userRepository.save(user);
                            } else {
                                System.out.println("User already in Database!");
                            }
                        }
                        super.onAuthenticationSuccess(request, response, authentication);
                    }
                })
                .failureHandler(new AuthenticationFailureHandler() {
                    @Override
                    public void onAuthenticationFailure(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, AuthenticationException e) throws IOException, ServletException {
                        httpServletRequest.getSession().setAttribute("error.message", e.getMessage());
                        handler.onAuthenticationFailure(httpServletRequest, httpServletResponse, e);
                    }
                });
    }
}