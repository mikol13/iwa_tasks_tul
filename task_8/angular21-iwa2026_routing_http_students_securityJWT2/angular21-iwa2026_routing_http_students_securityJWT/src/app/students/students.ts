import { Component, inject, OnInit, signal } from '@angular/core';
import { Student } from '../models/student';
import { StudentService } from '../services/studentService';
import { TokenStorageService } from '../auth/token-storage-service';

type MessageType = 'success' | 'error' | '';

@Component({
  selector: 'app-students',
  imports: [],
  templateUrl: './students.html',
  styleUrl: './students.css',
})
export class Students implements OnInit {
  protected readonly studentList = signal<Student[]>([]);
  protected readonly canEdit = signal(false);
  protected readonly message = signal('');
  protected readonly messageType = signal<MessageType>('');

  private readonly studentService = inject(StudentService);
  private readonly tokenStorage = inject(TokenStorageService);

  ngOnInit(): void {
    this.canEdit.set(this.tokenStorage.getAuthorities().includes('ROLE_ADMIN'));
    this.getStudents();
  }

  protected add(firstname: string, lastname: string, email: string, telephone: string): void {
    const student = this.createStudent(firstname, lastname, email, telephone);
    if (!student) {
      return;
    }

    this.studentService.addStudent(student).subscribe({
      next: (added) => {
        this.studentList.update((list) => [...list, added]);
        this.showMessage('Student added.', 'success');
      },
      error: () => this.showMessage('The server could not add the student.', 'error'),
    });
  }

  protected update(firstname: string, lastname: string, email: string, telephone: string, student: Student): void {
    const replacement = this.createStudent(firstname, lastname, email, telephone);
    if (!replacement || student.id === undefined) {
      return;
    }

    this.studentService.updateStudent(replacement, student.id).subscribe({
      next: (updated) => {
        this.studentList.update((list) => list.map((current) => current.id === updated.id ? updated : current));
        this.showMessage('Student updated.', 'success');
      },
      error: () => this.showMessage('The server could not update the student.', 'error'),
    });
  }

  protected delete(student: Student): void {
    this.studentService.deleteStudent(student).subscribe({
      next: () => {
        this.studentList.update((list) => list.filter((current) => current.id !== student.id));
        this.showMessage('Student deleted.', 'success');
      },
      error: () => this.showMessage('The server could not delete the student.', 'error'),
    });
  }

  protected deleteAll(): void {
    this.studentService.deleteStudents().subscribe({
      next: () => {
        this.studentList.set([]);
        this.showMessage('All students deleted.', 'success');
      },
      error: () => this.showMessage('The server could not delete students.', 'error'),
    });
  }

  private getStudents(): void {
    this.studentService.getStudents().subscribe({
      next: (students) => this.studentList.set(students),
      error: () => this.showMessage('The server could not load students.', 'error'),
    });
  }

  private createStudent(firstname: string, lastname: string, email: string, telephone: string): Student | null {
    const values = [firstname, lastname, email, telephone].map((value) => value.trim());
    if (values.some((value) => !value)) {
      this.showMessage('Complete all fields before saving.', 'error');
      return null;
    }

    return { firstname: values[0], lastname: values[1], email: values[2], telephone: values[3] } as Student;
  }

  private showMessage(message: string, type: MessageType): void {
    this.message.set(message);
    this.messageType.set(type);
  }
}
