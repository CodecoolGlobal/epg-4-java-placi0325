package com.codecool.elproyectegrande.controller;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.codecool.elproyectegrande.controller.dto.NewClientDTO;
import com.codecool.elproyectegrande.security.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@RestController
@RequestMapping
public class AuthController {
    private AuthenticationManager authenticationManager;
    private TokenService tokenService;

    @Autowired
    public AuthController(AuthenticationManager authenticationManager, TokenService tokenService) {
        this.authenticationManager = authenticationManager;
        this.tokenService = tokenService;
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody NewClientDTO clientDTO) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(clientDTO.clientName(), clientDTO.password()));
            Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
            List<String> roles = new ArrayList<>(authorities.size());
            for (GrantedAuthority authority : authorities) {
                roles.add(authority.getAuthority());
            }



            /*String key = "lacinagyoneroskulcsalacinagyoneroskulcsalacinagyoneroskulcsa";
            Algorithm algorithm = Algorithm.HMAC256(key.getBytes());

            String token = JWT.create()
                    .withSubject(String.valueOf(authentication.getPrincipal()))
                    .withClaim("roles", roles)
                    .sign(algorithm);*/
            String token = tokenService.generateToken(authentication);

            return ResponseEntity.ok().header("Authorization", "Bearer " + token).build();

        } catch (UsernameNotFoundException exception){
            //no username found
            return new ResponseEntity<Error>(HttpStatusCode.valueOf(404));
        } catch (AuthenticationException exception){
            //bad password
            return new ResponseEntity<Error>(HttpStatusCode.valueOf(401));

        }
    }
}
