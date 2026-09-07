package pl.dmcs.rkotas.journal.api.dto;

import java.time.LocalDate;

public record GradeView(Long id, int value, String subject, String teacher, String comment, LocalDate issuedOn) {
}
