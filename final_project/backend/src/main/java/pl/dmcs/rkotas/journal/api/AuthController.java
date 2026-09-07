package pl.dmcs.rkotas.journal.api;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.dmcs.rkotas.journal.api.dto.AuthResponse;
import pl.dmcs.rkotas.journal.api.dto.LoginRequest;
import pl.dmcs.rkotas.journal.security.JwtService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:4200", "http://127.0.0.1:4200"})
public class AuthController {
    private final DaoAuthenticationProvider authenticationProvider;
    private final JwtService jwtService;

    public AuthController(DaoAuthenticationProvider authenticationProvider, JwtService jwtService) {
        this.authenticationProvider = authenticationProvider;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        Authentication authentication = authenticationProvider.authenticate(
                new UsernamePasswordAuthenticationToken(request.username(), request.password()));
        var roles = authentication.getAuthorities().stream().map(item -> item.getAuthority()).toList();
        return ResponseEntity.ok(new AuthResponse(jwtService.createToken(authentication), authentication.getName(), roles));
    }
}
