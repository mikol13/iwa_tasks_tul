package pl.dmcs.rkotas.journal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.dmcs.rkotas.journal.model.Student;

import java.util.List;
import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student, Long> {
    Optional<Student> findByUserUsername(String username);
    List<Student> findByUniversityGroupIdOrderByLastNameAsc(Long groupId);
}
