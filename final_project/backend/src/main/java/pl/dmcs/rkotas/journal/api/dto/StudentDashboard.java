package pl.dmcs.rkotas.journal.api.dto;

import java.util.List;

public record StudentDashboard(String studentName, String groupName, List<GradeView> grades) {
}
