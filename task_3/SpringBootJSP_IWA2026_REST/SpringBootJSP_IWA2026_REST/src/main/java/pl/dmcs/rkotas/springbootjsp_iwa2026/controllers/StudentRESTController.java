package pl.dmcs.rkotas.springbootjsp_iwa2026.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.dmcs.rkotas.springbootjsp_iwa2026.model.Student;
import pl.dmcs.rkotas.springbootjsp_iwa2026.repository.StudentRepository;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/students")
public class StudentRESTController {

    private final StudentRepository studentRepository;

    public StudentRESTController(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @GetMapping
    public List<Student> findAllStudents() {
        return studentRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Student> addStudent(@RequestBody Student student) {
        studentRepository.save(student);
        return ResponseEntity.status(HttpStatus.CREATED).body(student);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Student> deleteStudent(@PathVariable("id") long id) {
        Student student = studentRepository.findById(id);
        if (student == null) {
            System.out.println("Student not found!");
            return ResponseEntity.notFound().build();
        }
        studentRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Student> updateStudent(@RequestBody Student student, @PathVariable("id") long id) {
        student.setId(id);
        studentRepository.save(student);
        return ResponseEntity.ok(student);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Student> updatePartOfStudent(@RequestBody Map<String, Object> updates, @PathVariable("id") long id) {
        Student student = studentRepository.findById(id);
        if (student == null) {
            System.out.println("Student not found!");
            return ResponseEntity.notFound().build();
        }
        applyUpdates(student, updates);
        return ResponseEntity.noContent().build();
    }

    private void applyUpdates(Student student, Map<String, Object> updates) {
        if (updates.containsKey("firstname")) {
            student.setFirstname((String) updates.get("firstname"));
        }
        if (updates.containsKey("lastname")) {
            student.setLastname((String) updates.get("lastname"));
        }
        if (updates.containsKey("email")) {
            student.setEmail((String) updates.get("email"));
        }
        if (updates.containsKey("telephone")) {
            student.setTelephone((String) updates.get("telephone"));
        }
        studentRepository.save(student);
    }

    // --------------------------------------------------------------------------------------------------

    @DeleteMapping
    public ResponseEntity<Void> deleteAllStudents() {
        studentRepository.deleteAll();
        return ResponseEntity.noContent().build();
    }

    @PutMapping
    public ResponseEntity<List<Student>> replaceAllStudents(@RequestBody List<Student> students) {
        studentRepository.deleteAll();
        List<Student> savedStudents = studentRepository.saveAll(students);
        return ResponseEntity.ok(savedStudents);
    }

    @GetMapping(value = "/{id}", produces = "application/json")
    public ResponseEntity<Student> getStudent(@PathVariable("id") long id) {
        Student student = studentRepository.findById(id);
        if (student == null) {
            System.out.println("Student not found!");
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(student);
    }

}
