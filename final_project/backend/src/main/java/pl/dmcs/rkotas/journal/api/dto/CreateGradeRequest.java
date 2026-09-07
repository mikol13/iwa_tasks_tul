package pl.dmcs.rkotas.journal.api.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record CreateGradeRequest(@NotNull Long studentId, @NotNull Long subjectId,
                                 @Min(2) @Max(5) int value, String comment) {
}
