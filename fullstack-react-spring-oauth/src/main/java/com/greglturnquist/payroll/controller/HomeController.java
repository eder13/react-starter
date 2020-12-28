package com.greglturnquist.payroll.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.annotation.RegisteredOAuth2AuthorizedClient;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.Collections;
import java.util.Map;

@Controller // <1>
public class HomeController {

	@RequestMapping(value = "/") // <2>
	public String index() {
		return "index"; // <3>
	}

	@ResponseBody
	@GetMapping("/user")
	public Map<String, Object> user(@AuthenticationPrincipal OAuth2User principal) {
		return Collections.singletonMap("name", principal.getAttribute("name"));
	}

	@ResponseBody
	@GetMapping("/error")
	public String error(HttpServletRequest httpServletRequest) {
		String message = (String) httpServletRequest.getSession().getAttribute("error.message");
		httpServletRequest.getSession().removeAttribute("error.message");
		return message;
	}

	//@ResponseBody
	//@GetMapping("/access-token")
	//public String accessToken(@RegisteredOAuth2AuthorizedClient OAuth2AuthorizedClient authorizedClient) {
	//	return "{ " + "\"accessToken\":"  + " \"" + authorizedClient.getAccessToken().getTokenValue() + "\" " + "}";
	//}
}