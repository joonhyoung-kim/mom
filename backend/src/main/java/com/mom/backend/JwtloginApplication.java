package com.mom.backend;


import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;



@SpringBootApplication
//@ComponentScan("com.mom.backend")
//@ComponentScan(basePackages = {"com.mom","com.mom.jwt"})
@MapperScan(basePackages = "com.mom")
public class JwtloginApplication extends  SpringBootServletInitializer {
    public static void main(String[] args) {
        SpringApplication.run(JwtloginApplication.class, args);
    }
    
    @Override 
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
    	return builder.sources(JwtloginApplication.class);
    }

    
}
