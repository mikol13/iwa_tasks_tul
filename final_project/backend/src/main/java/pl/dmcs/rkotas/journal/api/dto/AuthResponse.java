package pl.dmcs.rkotas.journal.api.dto;

import java.util.List;

public record AuthResponse(String accessToken, String username, List<String> roles) {
}
