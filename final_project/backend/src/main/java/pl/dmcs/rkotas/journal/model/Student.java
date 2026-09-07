package pl.dmcs.rkotas.journal.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "journal_students")
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;

    @OneToOne(optional = false)
    @JoinColumn(name = "user_id", unique = true)
    private UserAccount user;

    @ManyToOne(optional = false)
    @JoinColumn(name = "class_id")
    private UniversityGroup universityGroup;

    protected Student() {
    }

    public Student(String firstName, String lastName, UserAccount user, UniversityGroup universityGroup) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.user = user;
        this.universityGroup = universityGroup;
    }

    public Long getId() { return id; }
    public String getFullName() { return firstName + " " + lastName; }
    public UserAccount getUser() { return user; }
    public UniversityGroup getUniversityGroup() { return universityGroup; }
}
