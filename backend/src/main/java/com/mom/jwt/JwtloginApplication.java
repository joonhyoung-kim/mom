package com.mom.jwt;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;



 

@SpringBootApplication
@ComponentScan("com.mom")
//@MapperScan(basePackages = "com.mom")
public class JwtloginApplication extends  SpringBootServletInitializer {
    public static void main(String[] args) {
        SpringApplication.run(JwtloginApplication.class, args);
    }
    
    @Override 
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
    	return builder.sources(JwtloginApplication.class);
    }

    
}
