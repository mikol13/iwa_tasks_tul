package pl.dmcs.rkotas.journal.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record CreateSubjectRequest(
        @NotBlank @Size(min = 2, max = 80) String name,
        @NotNull Long groupId) {
}
