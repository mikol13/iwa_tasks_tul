import { DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NewGrade, NewSubject, TeacherDashboard } from '../../models/journal.models';
import { TeacherService } from '../../services/teacher.service';

@Component({
  selector: 'app-teacher-dashboard',
  imports: [FormsModule, DatePipe],
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css', './teacher-dashboard.admin.css'],
})
export class TeacherDashboardComponent {
  private readonly teachers = inject(TeacherService);

  readonly dashboard = signal<TeacherDashboard | null>(null);
  readonly loadingGrade = signal(false);
  readonly loadingSubject = signal(false);
  readonly gradeMessage = signal('');
  readonly subjectMessage = signal('');
  readonly errorMessage = signal('');

  studentId: number | null = null;
  subjectId: number | null = null;
  value = 5;
  comment = '';
  subjectName = '';
  groupId: number | null = null;

  constructor() {
    this.load();
  }

  addGrade(): void {
    if (!this.studentId || !this.subjectId) return;
    const payload: NewGrade = {
      studentId: this.studentId,
      subjectId: this.subjectId,
      value: this.value,
      comment: this.comment.trim(),
    };
    this.loadingGrade.set(true);
    this.gradeMessage.set('');
    this.errorMessage.set('');
    this.teachers.addGrade(payload).subscribe({
      next: (grade) => {
        this.dashboard.update((current) => current
          ? { ...current, recentGrades: [grade, ...current.recentGrades].slice(0, 8) }
          : current);
        this.comment = '';
        this.gradeMessage.set('The grade was saved.');
      },
      error: (response) => {
        this.loadingGrade.set(false);
        this.errorMessage.set(response.error?.message ?? 'The grade could not be saved.');
      },
      complete: () => this.loadingGrade.set(false),
    });
  }

  addSubject(form: NgForm): void {
    if (form.invalid || !this.groupId) return;
    const payload: NewSubject = { name: this.subjectName.trim(), groupId: this.groupId };
    this.loadingSubject.set(true);
    this.subjectMessage.set('');
    this.errorMessage.set('');
    this.teachers.addSubject(payload).subscribe({
      next: (subject) => {
        this.subjectName = '';
        this.subjectMessage.set('The subject was created.');
        form.resetForm({ groupId: this.groupId, subjectName: '' });
        this.load(subject.id);
      },
      error: (response) => {
        this.loadingSubject.set(false);
        this.errorMessage.set(response.error?.message ?? 'The subject could not be created.');
      },
      complete: () => this.loadingSubject.set(false),
    });
  }

  gradeTone(value: number): string {
    if (value >= 5) return 'great';
    if (value >= 4) return 'good';
    if (value >= 3) return 'okay';
    return 'needs-work';
  }

  private load(preferredSubjectId?: number): void {
    this.teachers.getDashboard().subscribe({
      next: (data) => {
        this.dashboard.set(data);
        this.studentId = data.students[0]?.id ?? null;
        this.subjectId = preferredSubjectId ?? data.subjects[0]?.id ?? null;
        this.groupId = data.groups[0]?.id ?? null;
      },
      error: () => this.errorMessage.set('The teacher dashboard could not be loaded.'),
    });
  }
}
