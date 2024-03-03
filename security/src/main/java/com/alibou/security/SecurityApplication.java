package com.alibou.security;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"}, allowCredentials = "true")
public class SecurityApplication {

	public static void main(String[] args) {

		SpringApplication.run(SecurityApplication.class, args);
	}

}
