export type UserRole = 'ROLE_STUDENT' | 'ROLE_TEACHER';

export interface LoginResponse {
  accessToken: string;
  username: string;
  roles: UserRole[];
}

export interface Grade {
  id: number;
  value: number;
  comment: string;
  issuedOn: string;
  subject: string;
  teacher: string;
}

export interface StudentDashboard {
  studentName: string;
  groupName: string;
  grades: Grade[];
}

export interface TeacherStudent {
  id: number;
  fullName: string;
  groupName: string;
}

export interface TeacherSubject {
  id: number;
  name: string;
  groupName: string;
}

export interface UniversityGroup {
  id: number;
  name: string;
}

export interface TeacherDashboard {
  teacherName: string;
  students: TeacherStudent[];
  subjects: TeacherSubject[];
  groups: UniversityGroup[];
  recentGrades: Grade[];
}

export interface NewGrade {
  studentId: number;
  subjectId: number;
  value: number;
  comment: string;
}

export interface NewSubject {
  name: string;
  groupId: number;
}
