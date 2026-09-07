package pl.dmcs.rkotas.journal.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "journal_subjects")
public class Subject {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToOne(optional = false)
    @JoinColumn(name = "teacher_id")
    private Teacher teacher;

    @ManyToOne(optional = false)
    @JoinColumn(name = "class_id")
    private UniversityGroup universityGroup;

    protected Subject() {
    }

    public Subject(String name, Teacher teacher, UniversityGroup universityGroup) {
        this.name = name;
        this.teacher = teacher;
        this.universityGroup = universityGroup;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public Teacher getTeacher() { return teacher; }
    public UniversityGroup getUniversityGroup() { return universityGroup; }
}
