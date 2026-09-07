package pl.dmcs.rkotas.journal.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "journal_classes")
public class UniversityGroup {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    protected UniversityGroup() {
    }

    public UniversityGroup(String name) {
        this.name = name;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
}
