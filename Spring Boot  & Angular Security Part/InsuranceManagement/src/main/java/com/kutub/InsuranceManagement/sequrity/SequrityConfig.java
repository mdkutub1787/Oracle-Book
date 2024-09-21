package com.kutub.InsuranceManagement.sequrity;

import com.kutub.InsuranceManagement.jwt.JwtAuthenticationFilter;
import com.kutub.InsuranceManagement.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor

public class SequrityConfig {

    private final UserService userService;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        return
                http
                        .csrf(AbstractHttpConfigurer::disable)
                        .authorizeHttpRequests(

                                req ->
                                        req.requestMatchers("/login", "/register", "/register/admin", "/register/bill","api/policy/", "api/policy/save","api/policy/delete/{id}","api/policy/{id}","api/policy/update/{id}",
                                                        "api/bill/","api/bill/save","api/bill/delete/{id}","api/bill/update/{id}","api/bill/{id}",
                                                        "api/receipt/","api/receipt/save","api/receipt/delete/{id}","api/receipt/{id}",
                                                        "api/moneyreceipt/","api/moneyreceipt/save","api/moneyreceipt/delete/{id}","api/moneyreceipt/{id}")
                                                .permitAll()
                                                .requestMatchers("api/bill/save", "api/receipt/save")
                                                .hasAuthority("ADMIN")
                                                .requestMatchers( "api/bill/{id}","api/bill/all/**", "api/policy/")
                                                .hasAnyAuthority("ADMIN", "BILL")
                                                .requestMatchers("api/user/**")
                                                .hasAuthority("USER")
                                                .requestMatchers("/images/**").permitAll()

                        )
                        .userDetailsService(userService)
                        .sessionManagement(
                                session ->
                                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                        )
                        .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                        .build();


    }

    @Bean
    public PasswordEncoder encoder() {
        return new BCryptPasswordEncoder();
    }


    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }


}
