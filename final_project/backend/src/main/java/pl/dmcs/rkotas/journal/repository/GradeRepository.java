package pl.dmcs.rkotas.journal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.dmcs.rkotas.journal.model.Grade;

import java.util.List;

public interface GradeRepository extends JpaRepository<Grade, Long> {
    List<Grade> findByStudentIdOrderByIssuedOnDesc(Long studentId);
    List<Grade> findTop8ByTeacherIdOrderByIssuedOnDesc(Long teacherId);
}
