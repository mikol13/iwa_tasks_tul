package pl.dmcs.rkotas.journal.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import java.time.LocalDate;

@Entity
@Table(name = "journal_grades")
public class Grade {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int value;
    private String comment;
    private LocalDate issuedOn;

    @ManyToOne(optional = false)
    @JoinColumn(name = "student_id")
    private Student student;

    @ManyToOne(optional = false)
    @JoinColumn(name = "subject_id")
    private Subject subject;

    @ManyToOne(optional = false)
    @JoinColumn(name = "teacher_id")
    private Teacher teacher;

    protected Grade() {
    }

    public Grade(int value, String comment, Student student, Subject subject, Teacher teacher) {
        this.value = value;
        this.comment = comment;
        this.student = student;
        this.subject = subject;
        this.teacher = teacher;
        this.issuedOn = LocalDate.now();
    }

    public Long getId() { return id; }
    public int getValue() { return value; }
    public String getComment() { return comment; }
    public LocalDate getIssuedOn() { return issuedOn; }
    public Student getStudent() { return student; }
    public Subject getSubject() { return subject; }
    public Teacher getTeacher() { return teacher; }
}
