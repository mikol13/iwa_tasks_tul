package pl.dmcs.rkotas.journal.api;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.dmcs.rkotas.journal.api.dto.GradeView;
import pl.dmcs.rkotas.journal.api.dto.StudentDashboard;
import pl.dmcs.rkotas.journal.repository.GradeRepository;
import pl.dmcs.rkotas.journal.repository.StudentRepository;

@RestController
@RequestMapping("/api/student")
public class StudentController {
    private final StudentRepository students;
    private final GradeRepository grades;

    public StudentController(StudentRepository students, GradeRepository grades) {
        this.students = students;
        this.grades = grades;
    }

    @GetMapping("/dashboard")
    public StudentDashboard dashboard(Authentication authentication) {
        var student = students.findByUserUsername(authentication.getName())
                .orElseThrow(() -> new IllegalArgumentException("Student profile was not found."));
        var gradeViews = grades.findByStudentIdOrderByIssuedOnDesc(student.getId()).stream()
                .map(grade -> new GradeView(grade.getId(), grade.getValue(), grade.getSubject().getName(),
                        grade.getTeacher().getFullName(), grade.getComment(), grade.getIssuedOn()))
                .toList();
        return new StudentDashboard(student.getFullName(), student.getUniversityGroup().getName(), gradeViews);
    }
}
