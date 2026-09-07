package pl.dmcs.rkotas.springbootjsp_iwa2026.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import pl.dmcs.rkotas.springbootjsp_iwa2026.model.Student;

@Controller
public class StudentController {

    @GetMapping("/student")
    public String student(Model model) {
        model.addAttribute("message", "Simple String from StudentController.");
        model.addAttribute("student", new Student());
        return "student";
    }

    @PostMapping("/addStudent.html")
    public String addStudent(@ModelAttribute("student") Student student) {

        System.out.println(student.getFirstname() + " " + student.getLastname() +
                " " + student.getEmail() + " " + student.getTelephone());

        return "redirect:student";
    }

}


