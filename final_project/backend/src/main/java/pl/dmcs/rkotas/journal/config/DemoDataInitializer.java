package pl.dmcs.rkotas.journal.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import pl.dmcs.rkotas.journal.model.Grade;
import pl.dmcs.rkotas.journal.model.RoleType;
import pl.dmcs.rkotas.journal.model.Student;
import pl.dmcs.rkotas.journal.model.Subject;
import pl.dmcs.rkotas.journal.model.Teacher;
import pl.dmcs.rkotas.journal.model.UniversityGroup;
import pl.dmcs.rkotas.journal.model.UserAccount;
import pl.dmcs.rkotas.journal.repository.GradeRepository;
import pl.dmcs.rkotas.journal.repository.StudentRepository;
import pl.dmcs.rkotas.journal.repository.SubjectRepository;
import pl.dmcs.rkotas.journal.repository.TeacherRepository;
import pl.dmcs.rkotas.journal.repository.UniversityGroupRepository;
import pl.dmcs.rkotas.journal.repository.UserAccountRepository;

@Configuration
public class DemoDataInitializer {
    @Bean
    CommandLineRunner createDemoData(UserAccountRepository users, UniversityGroupRepository groups,
                                     TeacherRepository teachers, StudentRepository students,
                                     SubjectRepository subjects, GradeRepository grades,
                                     PasswordEncoder passwordEncoder) {
        return args -> {
            if (users.count() > 0) {
                return;
            }

            UniversityGroup iwaGroup = groups.save(new UniversityGroup("IWA-1"));

            UserAccount mathAccount = users.save(new UserAccount("anna.teacher", passwordEncoder.encode("teacher123"), RoleType.TEACHER));
            UserAccount polishAccount = users.save(new UserAccount("marek.teacher", passwordEncoder.encode("teacher123"), RoleType.TEACHER));
            Teacher anna = teachers.save(new Teacher("Anna", "Zielińska", mathAccount));
            Teacher marek = teachers.save(new Teacher("Marek", "Wiśniewski", polishAccount));

            UserAccount janAccount = users.save(new UserAccount("jan.student", passwordEncoder.encode("student123"), RoleType.STUDENT));
            UserAccount zosiaAccount = users.save(new UserAccount("zosia.student", passwordEncoder.encode("student123"), RoleType.STUDENT));
            Student jan = students.save(new Student("Jan", "Kowalski", janAccount, iwaGroup));
            Student zosia = students.save(new Student("Zofia", "Nowak", zosiaAccount, iwaGroup));

            Subject webApplications = subjects.save(new Subject("Web Applications", anna, iwaGroup));
            Subject databases = subjects.save(new Subject("Databases", marek, iwaGroup));

            grades.save(new Grade(5, "REST API project", jan, webApplications, anna));
            grades.save(new Grade(4, "Angular assignment", jan, webApplications, anna));
            grades.save(new Grade(5, "Database design", jan, databases, marek));
            grades.save(new Grade(5, "Spring Boot activity", zosia, webApplications, anna));
            grades.save(new Grade(4, "SQL exercise", zosia, databases, marek));
        };
    }
}
