package com.annadata.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        http.csrf(customizer -> customizer.disable());
//        http.authorizeHttpRequests(request -> request
//                .requestMatchers("/food-donation/api/v1/register", "/food-donation/api/v1/login").permitAll()
//                .requestMatchers("/food-donation/api/v1/receiver/**").hasRole("RECEIVER")
//                .requestMatchers("/food-donation/api/v1/donor/**").hasRole("DONOR")
//                .anyRequest().authenticated());
        http.authorizeHttpRequests(request -> request
                .anyRequest()
                .permitAll());
        http.formLogin(form -> form.disable());
        http.httpBasic(Customizer.withDefaults());
        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception{
        System.out.println("inside authentication manager");
        return configuration.getAuthenticationManager();
    }
}
