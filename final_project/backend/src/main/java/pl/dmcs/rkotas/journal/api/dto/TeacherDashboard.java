package pl.dmcs.rkotas.journal.api.dto;

import java.util.List;

public record TeacherDashboard(String teacherName, List<TeacherStudentView> students,
                               List<TeacherSubjectView> subjects, List<UniversityGroupView> groups,
                               List<GradeView> recentGrades) {
}
