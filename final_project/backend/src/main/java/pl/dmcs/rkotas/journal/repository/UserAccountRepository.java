package pl.dmcs.rkotas.journal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.dmcs.rkotas.journal.model.UserAccount;

import java.util.Optional;

public interface UserAccountRepository extends JpaRepository<UserAccount, Long> {
    Optional<UserAccount> findByUsername(String username);
}
