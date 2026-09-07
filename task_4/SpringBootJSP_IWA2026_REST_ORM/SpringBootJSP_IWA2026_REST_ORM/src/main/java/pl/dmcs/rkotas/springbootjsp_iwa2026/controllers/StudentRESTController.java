package pl.dmcs.rkotas.springbootjsp_iwa2026.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.dmcs.rkotas.springbootjsp_iwa2026.model.Student;
import pl.dmcs.rkotas.springbootjsp_iwa2026.model.Team;
import pl.dmcs.rkotas.springbootjsp_iwa2026.repository.AddressRepository;
import pl.dmcs.rkotas.springbootjsp_iwa2026.repository.StudentRepository;
import pl.dmcs.rkotas.springbootjsp_iwa2026.repository.TeamRepository;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/students")
public class StudentRESTController {

    private final StudentRepository studentRepository;
    private final AddressRepository addressRepository;
    private final TeamRepository teamRepository;

    public StudentRESTController(StudentRepository studentRepository, AddressRepository addressRepository, TeamRepository teamRepository) {
        this.studentRepository = studentRepository;
        this.addressRepository = addressRepository;
        this.teamRepository = teamRepository;
    }

    @GetMapping
    public List<Student> findAllStudents() {
        return studentRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Student> addStudent(@RequestBody Student student) {
        if (student.getAddress().getId() <= 0 )
        {
            addressRepository.save(student.getAddress());
        }
        Student savedStudent = studentRepository.save(student);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedStudent);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Student> deleteStudent (@PathVariable("id") long id) {
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
        Student updatedStudent = studentRepository.save(student);
        return ResponseEntity.ok(updatedStudent);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Student> updatePartOfStudent(@RequestBody Map<String, Object> updates, @PathVariable("id") long id) {
        Student student = studentRepository.findById(id);
        if (student == null) {
            System.out.println("Student not found!");
            return ResponseEntity.notFound().build();
        }
        partialUpdate(student,updates);
        return ResponseEntity.noContent().build();
    }

    private void partialUpdate(Student student, Map<String, Object> updates) {
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

    @DeleteMapping
    public ResponseEntity<Student> deleteStudents() {
        studentRepository.deleteAll();
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Student> getOneStudent (@PathVariable("id") long id) {
        Student student = studentRepository.findById(id);
        if (student == null) {
            System.out.println("Student not found!");
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(student);
    }

    @PostMapping("/{studentId}/teams/{teamId}")
    public ResponseEntity<Student> addTeamToStudent(@PathVariable long studentId, @PathVariable long teamId) {
        Student student = studentRepository.findById(studentId);
        Team team = teamRepository.findById(teamId).orElse(null);

        if (student == null || team == null) {
            return ResponseEntity.notFound().build();
        }

        student.getTeamList().add(team);
        studentRepository.save(student);
        return ResponseEntity.ok(student);
    }

}
