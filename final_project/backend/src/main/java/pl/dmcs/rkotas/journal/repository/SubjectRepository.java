package pl.dmcs.rkotas.journal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.dmcs.rkotas.journal.model.Subject;

import java.util.List;
import java.util.Optional;

public interface SubjectRepository extends JpaRepository<Subject, Long> {
    List<Subject> findByTeacherId(Long teacherId);
    Optional<Subject> findByIdAndTeacherId(Long id, Long teacherId);
    boolean existsByNameIgnoreCaseAndTeacherIdAndUniversityGroupId(String name, Long teacherId, Long groupId);
}
