import { DatePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Grade, StudentDashboard } from '../../models/journal.models';
import { StudentService } from '../../services/student.service';

interface SubjectSummary {
  name: string;
  grades: Grade[];
  average: number;
}

type SortOption = 'newest' | 'oldest' | 'highest' | 'lowest' | 'subject';

@Component({
  selector: 'app-student-dashboard',
  imports: [RouterLink, DatePipe],
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css', './student-dashboard.filters.css'],
})
export class StudentDashboardComponent {
  private readonly students = inject(StudentService);

  readonly dashboard = signal<StudentDashboard | null>(null);
  readonly errorMessage = signal('');
  readonly searchTerm = signal('');
  readonly selectedSubject = signal('all');
  readonly sortBy = signal<SortOption>('newest');

  readonly average = computed(() => {
    const grades = this.dashboard()?.grades ?? [];
    return grades.length
      ? (grades.reduce((sum, grade) => sum + grade.value, 0) / grades.length).toFixed(2)
      : '—';
  });

  readonly summaries = computed<SubjectSummary[]>(() => {
    const grouped = new Map<string, Grade[]>();
    for (const grade of this.dashboard()?.grades ?? []) {
      grouped.set(grade.subject, [...(grouped.get(grade.subject) ?? []), grade]);
    }
    return [...grouped.entries()]
      .map(([name, grades]) => ({
        name,
        grades,
        average: grades.reduce((sum, grade) => sum + grade.value, 0) / grades.length,
      }))
      .sort((left, right) => left.name.localeCompare(right.name));
  });

  readonly visibleGrades = computed(() => {
    const search = this.searchTerm().trim().toLocaleLowerCase();
    const selectedSubject = this.selectedSubject();
    const grades = [...(this.dashboard()?.grades ?? [])].filter((grade) => {
      const matchesSubject = selectedSubject === 'all' || grade.subject === selectedSubject;
      const searchableText = `${grade.subject} ${grade.teacher} ${grade.comment}`.toLocaleLowerCase();
      return matchesSubject && (!search || searchableText.includes(search));
    });

    return grades.sort((left, right) => {
      switch (this.sortBy()) {
        case 'oldest': return left.issuedOn.localeCompare(right.issuedOn);
        case 'highest': return right.value - left.value;
        case 'lowest': return left.value - right.value;
        case 'subject': return left.subject.localeCompare(right.subject);
        default: return right.issuedOn.localeCompare(left.issuedOn);
      }
    });
  });

  constructor() {
    this.load();
  }

  setSearch(value: string): void {
    this.searchTerm.set(value);
  }

  setSubject(value: string): void {
    this.selectedSubject.set(value);
  }

  setSort(value: string): void {
    this.sortBy.set(value as SortOption);
  }

  selectSubject(subject: string): void {
    this.selectedSubject.set(subject);
    this.showMatchingGrades();
  }

  showMatchingGrades(): void {
    document.getElementById('grade-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  gradeTone(value: number): string {
    if (value >= 5) return 'great';
    if (value >= 4) return 'good';
    if (value >= 3) return 'okay';
    return 'needs-work';
  }

  private load(): void {
    this.students.getDashboard().subscribe({
      next: (data) => this.dashboard.set(data),
      error: () => this.errorMessage.set('The grade data could not be loaded. Make sure the backend is running.'),
    });
  }
}
