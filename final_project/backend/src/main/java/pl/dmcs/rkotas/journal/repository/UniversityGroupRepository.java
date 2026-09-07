package pl.dmcs.rkotas.journal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.dmcs.rkotas.journal.model.UniversityGroup;

public interface UniversityGroupRepository extends JpaRepository<UniversityGroup, Long> {
}
