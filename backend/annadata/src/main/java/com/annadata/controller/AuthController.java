package com.annadata.controller;

import com.annadata.dto.RegisterUserDto;
import com.annadata.entity.Login;
import com.annadata.entity.User;
import com.annadata.repository.UserRepository;
import com.annadata.service.UserService;
import com.annadata.serviceImpl.AuthServiceImpl;
import com.annadata.serviceImpl.UserServiceImpl;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/food-donation/api/v1")

public class AuthController {

    @Autowired
    private AuthServiceImpl service;
    
    @Autowired
    private UserRepository userrepo;
    
    
    @PostMapping("/login")
    public ResponseEntity<Map<String,Object>> login(@RequestBody Login loginRequest, HttpServletRequest httpServletRequest){
        System.out.println("login called");
        System.out.println(loginRequest.getEmail() + " : " + loginRequest.getPassword());
        Map<String,Object> resp  = new HashMap<>();
        boolean isAuthenticated = service.authenticateUser(loginRequest);
        if(isAuthenticated){
            HttpSession session = httpServletRequest.getSession();
            session.setAttribute("USER_SESSION", loginRequest.getEmail());
            System.out.println(session.getAttribute("USER_SESSION"));
            
//            User user = this.userServiceImpl.getUserByEmail(loginRequest.getEmail());
            User user = this.userrepo.findByEmail(loginRequest.getEmail());
            
            
            resp.put("message", "Login Success");
            resp.put("status", true);
            resp.put("User", user);
            return new ResponseEntity<>(resp, HttpStatus.OK);
        }else{
        	resp.put("message", "Invalid creadential");
        	resp.put("status", false);
            return new ResponseEntity<>(resp, HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        SecurityContextHolder.clearContext();
        return ResponseEntity.ok("Logged out successfully");
    }

//    @Autowired
//    UserServiceImpl userserviceimpl;
//    @PostMapping("/RegisterUser")
//    public ResponseEntity<Map<String, Object>> RegisterUser(@RequestBody RegisterUserDto userdto){
//        System.out.println("Request received: " + userdto);
//    	User user = userdtoToUser(userdto); 
//    	user = userserviceimpl.createUser(user);
//    	Map<String, Object> resp = new HashMap<>();
//    	
//    	resp.put("message", "user register sucess");
//    	resp.put("user", user);
////    	return ResponseEntity<>(Map.of("message" , "registersuccess", user));
//    	return new ResponseEntity<>(resp,HttpStatus.OK);	
//    }
//    public static User userdtoToUser(RegisterUserDto userdto) {
//    	User user = new User();
//    	user.setName(userdto.getName());
//    	user.setEmail(userdto.getEmail());
//    	user.setPassword(userdto.getPassword());
//    	user.setPhoneNumber(userdto.getPhoneNumber());
//    	user.setRole(User.Role.RECEIVER);
//    	
//    	return user;
//    }
}
