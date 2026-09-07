package pl.dmcs.rkotas.journal.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Date;
import java.util.Optional;

@Component
public class JwtService {
    private final SecretKey secretKey;
    private final long expirationSeconds;

    public JwtService(@Value("${journal.jwt.secret}") String secret,
                      @Value("${journal.jwt.expiration-seconds}") long expirationSeconds) {
        this.secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        this.expirationSeconds = expirationSeconds;
    }

    public String createToken(Authentication authentication) {
        Instant now = Instant.now();
        return Jwts.builder()
                .subject(authentication.getName())
                .issuedAt(Date.from(now))
                .expiration(Date.from(now.plusSeconds(expirationSeconds)))
                .signWith(secretKey, Jwts.SIG.HS256)
                .compact();
    }

    public Optional<String> usernameFrom(String token) {
        try {
            return Optional.of(Jwts.parser().verifyWith(secretKey).build()
                    .parseSignedClaims(token).getPayload().getSubject());
        } catch (RuntimeException exception) {
            return Optional.empty();
        }
    }
}
