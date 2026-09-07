import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Student } from '../models/student';
import { StudentService } from '../services/studentService';

type MessageType = 'success' | 'error' | '';

@Component({
  selector: 'app-students',
  imports: [CommonModule],
  templateUrl: './students.html',
  styleUrl: './students.css',
})
export class Students implements OnInit {
  private readonly studentService = inject(StudentService);

  readonly studentList = signal<Student[]>([]);
  readonly message = signal('');
  readonly messageType = signal<MessageType>('');

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents(): void {
    this.studentService.getStudents().subscribe((students) => {
      this.studentList.set(students);
    });
  }

  add(firstname: string, lastname: string, email: string, telephone: string): void {
    const student = this.createStudent(firstname, lastname, email, telephone);
    if (!student) {
      return;
    }

    this.studentService.addStudent(student).subscribe((added) => {
      if (added) {
        this.studentList.update((list) => [...list, added]);
        this.showMessage('Student added.', 'success');
      }
    });
  }

  update(firstname: string, lastname: string, email: string, telephone: string, student: Student): void {
    const replacement = this.createStudent(firstname, lastname, email, telephone);
    if (!replacement || student.id === undefined) {
      return;
    }

    this.studentService.updateStudent(replacement, student.id).subscribe((updated) => {
      if (updated) {
        this.replaceStudentInList(updated);
        this.showMessage('Student updated with PUT.', 'success');
      }
    });
  }

  patchStudent(firstname: string, lastname: string, email: string, telephone: string, student: Student): void {
    if (student.id === undefined) {
      return;
    }

    const updates: Partial<Student> = {};
    if (firstname.trim()) updates.firstname = firstname.trim();
    if (lastname.trim()) updates.lastname = lastname.trim();
    if (email.trim()) updates.email = email.trim();
    if (telephone.trim()) updates.telephone = telephone.trim();

    if (Object.keys(updates).length === 0) {
      this.showMessage('Enter at least one value for PATCH.', 'error');
      return;
    }

    this.studentService.patchStudent(student.id, updates).subscribe((updated) => {
      if (updated) {
        this.replaceStudentInList(updated);
        this.showMessage('Student patched.', 'success');
      }
    });
  }

  replaceAll(firstname: string, lastname: string, email: string, telephone: string): void {
    if (this.studentList().length === 0) {
      return;
    }

    const updatedList = this.studentList().map((student) => ({
      ...student,
      firstname: firstname.trim() || student.firstname,
      lastname: lastname.trim() || student.lastname,
      email: email.trim() || student.email,
      telephone: telephone.trim() || student.telephone,
    }));

    this.studentService.updateAllStudents(updatedList).subscribe((students) => {
      this.studentList.set(students);
      this.showMessage('Collection replaced with PUT all.', 'success');
    });
  }

  delete(student: Student): void {
    this.studentService.deleteStudent(student).subscribe(() => {
      this.studentList.update((list) => list.filter((current) => current !== student));
      this.showMessage('Student deleted.', 'success');
    });
  }

  deleteAll(): void {
    this.studentService.deleteStudents().subscribe(() => {
      this.studentList.set([]);
      this.showMessage('All students deleted.', 'success');
    });
  }

  private createStudent(firstname: string, lastname: string, email: string, telephone: string): Student | null {
    const values = [firstname, lastname, email, telephone].map((value) => value.trim());
    if (values.some((value) => !value)) {
      this.showMessage('Complete all fields for POST or PUT.', 'error');
      return null;
    }

    return new Student(values[0], values[1], values[2], values[3]);
  }

  private replaceStudentInList(updated: Student): void {
    this.studentList.update((list) =>
      list.map((student) => (student.id === updated.id ? updated : student))
    );
  }

  private showMessage(message: string, type: MessageType): void {
    this.message.set(message);
    this.messageType.set(type);
    setTimeout(() => {
      this.message.set('');
      this.messageType.set('');
    }, 2500);
  }
}
