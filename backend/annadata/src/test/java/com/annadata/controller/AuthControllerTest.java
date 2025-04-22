package com.annadata.controller;

import com.annadata.dto.RegisterRequestDTO;
import com.annadata.entity.Login;
import com.annadata.entity.User;
import com.annadata.repository.UserRepository;
import com.annadata.service.AuthService;
import com.annadata.valueobject.Role;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;

import java.util.Map;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
@ExtendWith(MockitoExtension.class)
@SpringBootTest
class AuthControllerTest {

    @InjectMocks
    private AuthController authController;

    @Mock
    private AuthService authService;

    @Mock
    private UserRepository userRepository;

    @Mock
    private HttpServletRequest httpServletRequest;

    @Mock
    private HttpSession session;

    private final UUID userId = UUID.randomUUID();
    private final String email = "user@example.com";

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        lenient().when(httpServletRequest.getSession(true)).thenReturn(session);
    }

    @Test
    void loginSuccess_shouldReturnOkResponse() {
        Login login = new Login(email, "password");
        User mockUser = User.builder().id(userId).email(email).role(Role.DONOR).build();

        when(authService.authenticateUser(login)).thenReturn(true);
        when(userRepository.findByEmail(email)).thenReturn(mockUser);

        ResponseEntity<Map<String, Object>> response = authController.login(login, httpServletRequest);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Login Success", response.getBody().get("message"));
        verify(session).setAttribute(eq("UserId"), eq(userId));
        verify(session).setAttribute(eq("Role"), eq(Role.DONOR));
    }

    @Test
    void loginFailure_shouldReturnUnauthorized() {
        Login login = new Login(email, "wrongPass");

        when(authService.authenticateUser(login)).thenReturn(false);

        ResponseEntity<Map<String, Object>> response = authController.login(login, httpServletRequest);

        assertEquals(401, response.getStatusCodeValue());
        assertEquals("Invalid credential", response.getBody().get("message"));
    }

    @Test
    void registerSuccess_shouldReturnCreated() {
        RegisterRequestDTO request = new RegisterRequestDTO("name", email, "pass", "9999999999", "RECEIVER");
        User mockUser = User.builder().id(userId).email(email).role(Role.RECEIVER).build();

        when(authService.userExists(email)).thenReturn(null);
        when(authService.registerUser(request)).thenReturn(mockUser);

        ResponseEntity<String> response = authController.register(request, httpServletRequest);

        assertEquals(201, response.getStatusCodeValue());
        assertEquals("Registration successful", response.getBody());
        verify(session).setAttribute(eq("UserId"), eq(userId));
        verify(session).setAttribute(eq("Role"), eq(Role.RECEIVER));
    }

    @Test
    void registerUserExists_shouldReturnConflict() {
        RegisterRequestDTO request = new RegisterRequestDTO("name", email, "pass", "9999999999", "RECEIVER");
        User existingUser = new User();

        when(authService.userExists(email)).thenReturn(existingUser);

        ResponseEntity<String> response = authController.register(request, httpServletRequest);

        assertEquals(409, response.getStatusCodeValue());
        assertEquals("User already exists", response.getBody());
    }

    @Test
    void logout_shouldInvalidateSession() {
        when(httpServletRequest.getSession(false)).thenReturn(session);

        ResponseEntity<String> response = authController.logout(httpServletRequest);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Logged out successfully", response.getBody());
        verify(session).invalidate();
    }
}
