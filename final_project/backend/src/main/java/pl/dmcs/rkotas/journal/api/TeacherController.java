package pl.dmcs.rkotas.journal.api;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import pl.dmcs.rkotas.journal.api.dto.CreateGradeRequest;
import pl.dmcs.rkotas.journal.api.dto.CreateSubjectRequest;
import pl.dmcs.rkotas.journal.api.dto.GradeView;
import pl.dmcs.rkotas.journal.api.dto.TeacherDashboard;
import pl.dmcs.rkotas.journal.api.dto.TeacherStudentView;
import pl.dmcs.rkotas.journal.api.dto.TeacherSubjectView;
import pl.dmcs.rkotas.journal.api.dto.UniversityGroupView;
import pl.dmcs.rkotas.journal.model.Grade;
import pl.dmcs.rkotas.journal.model.Subject;
import pl.dmcs.rkotas.journal.repository.GradeRepository;
import pl.dmcs.rkotas.journal.repository.StudentRepository;
import pl.dmcs.rkotas.journal.repository.SubjectRepository;
import pl.dmcs.rkotas.journal.repository.TeacherRepository;
import pl.dmcs.rkotas.journal.repository.UniversityGroupRepository;

@RestController
@RequestMapping("/api/teacher")
public class TeacherController {
    private final TeacherRepository teachers;
    private final StudentRepository students;
    private final SubjectRepository subjects;
    private final GradeRepository grades;
    private final UniversityGroupRepository groups;

    public TeacherController(TeacherRepository teachers, StudentRepository students,
                             SubjectRepository subjects, GradeRepository grades,
                             UniversityGroupRepository groups) {
        this.teachers = teachers;
        this.students = students;
        this.subjects = subjects;
        this.grades = grades;
        this.groups = groups;
    }

    @GetMapping("/dashboard")
    public TeacherDashboard dashboard(Authentication authentication) {
        var teacher = currentTeacher(authentication);
        var subjectViews = subjects.findByTeacherId(teacher.getId()).stream()
                .map(this::toSubjectView)
                .toList();
        var studentViews = subjects.findByTeacherId(teacher.getId()).stream()
                .flatMap(subject -> students.findByUniversityGroupIdOrderByLastNameAsc(
                        subject.getUniversityGroup().getId()).stream())
                .distinct()
                .map(student -> new TeacherStudentView(student.getId(), student.getFullName(),
                        student.getUniversityGroup().getName()))
                .toList();
        var groupViews = groups.findAll().stream()
                .map(group -> new UniversityGroupView(group.getId(), group.getName()))
                .toList();
        var recentGrades = grades.findTop8ByTeacherIdOrderByIssuedOnDesc(teacher.getId()).stream()
                .map(this::toGradeView)
                .toList();
        return new TeacherDashboard(teacher.getFullName(), studentViews, subjectViews, groupViews, recentGrades);
    }

    @PostMapping("/subjects")
    @ResponseStatus(HttpStatus.CREATED)
    public TeacherSubjectView addSubject(@Valid @RequestBody CreateSubjectRequest request,
                                         Authentication authentication) {
        var teacher = currentTeacher(authentication);
        var group = groups.findById(request.groupId())
                .orElseThrow(() -> new IllegalArgumentException("University group was not found."));
        var name = request.name().trim();
        if (subjects.existsByNameIgnoreCaseAndTeacherIdAndUniversityGroupId(
                name, teacher.getId(), group.getId())) {
            throw new IllegalArgumentException("This subject already exists for the selected group.");
        }
        return toSubjectView(subjects.save(new Subject(name, teacher, group)));
    }

    @PostMapping("/grades")
    @ResponseStatus(HttpStatus.CREATED)
    public GradeView addGrade(@Valid @RequestBody CreateGradeRequest request, Authentication authentication) {
        var teacher = currentTeacher(authentication);
        var subject = subjects.findByIdAndTeacherId(request.subjectId(), teacher.getId())
                .orElseThrow(() -> new IllegalArgumentException("You can grade only your own subjects."));
        var student = students.findById(request.studentId())
                .orElseThrow(() -> new IllegalArgumentException("Student was not found."));
        if (!student.getUniversityGroup().getId().equals(subject.getUniversityGroup().getId())) {
            throw new IllegalArgumentException("This student does not attend the selected subject.");
        }
        var grade = grades.save(new Grade(request.value(), request.comment() == null ? "" : request.comment().trim(),
                student, subject, teacher));
        return toGradeView(grade);
    }

    private pl.dmcs.rkotas.journal.model.Teacher currentTeacher(Authentication authentication) {
        return teachers.findByUserUsername(authentication.getName())
                .orElseThrow(() -> new IllegalArgumentException("Teacher profile was not found."));
    }

    private GradeView toGradeView(Grade grade) {
        return new GradeView(grade.getId(), grade.getValue(), grade.getSubject().getName(),
                grade.getTeacher().getFullName(), grade.getComment(), grade.getIssuedOn());
    }

    private TeacherSubjectView toSubjectView(Subject subject) {
        return new TeacherSubjectView(subject.getId(), subject.getName(),
                subject.getUniversityGroup().getName());
    }
}
