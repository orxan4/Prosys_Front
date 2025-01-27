import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, firstValueFrom } from 'rxjs';

import urls from '../constants/urls';

import tokenService from './token.service';

import {
  LoginDto,
  LoginResponseClass,
  ExamDto,
  ExamModel,
  LessonDto,
  LessonModel,
  StudentDto,
  StudentModel,
  CommonResponseClass,
} from '../types/all.types';

@Injectable({ providedIn: 'root' })
export class GlobalService {
  $exams: BehaviorSubject<ExamModel[]> = new BehaviorSubject([]);
  $lessons: BehaviorSubject<LessonModel[]> = new BehaviorSubject([]);
  $students: BehaviorSubject<StudentModel[]> = new BehaviorSubject([]);

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  async login(dto: LoginDto): Promise<boolean> {
    try {
      const obs = this.http.post<LoginResponseClass>(`${urls.auth}/login`, dto);
      await firstValueFrom(obs);
      return true;
    } catch {
      return false;
    }
  }

  logout(): void {
    tokenService.deleteAccessToken();
    this.router.navigate(['/login']).then();
  }

  async createExam(dto: ExamDto): Promise<boolean> {
    try {
      const obs = this.http.post<CommonResponseClass>(urls.exams, dto);
      await firstValueFrom(obs);
      await this.refresh();
      return true;
    } catch {
      return false;
    }
  }

  async getExams(): Promise<boolean> {
    try {
      const obs = this.http.get<Array<ExamModel>>(urls.exams);
      const exams = await firstValueFrom(obs);
      this.$exams.next(exams);
      return true;
    } catch {
      return false;
    }
  }

  async editExamById(id: string, dto: ExamDto): Promise<boolean> {
    try {
      const obs = this.http.put<Array<StudentModel>>(urls.exams + `/${id}`, dto);
      await firstValueFrom(obs);
      await this.refresh();
      return true;
    } catch {
      return false;
    }
  }

  async deleteExamById(id: string): Promise<boolean> {
    try {
      const obs = this.http.delete<Array<StudentModel>>(urls.exams + `/${id}`);
      await firstValueFrom(obs);
      await this.refresh();
      return true;
    } catch {
      return false;
    }
  }

  async createLesson(dto: LessonDto): Promise<boolean> {
    try {
      const obs = this.http.post<CommonResponseClass>(urls.lessons, dto);
      await firstValueFrom(obs);
      await this.getLessons();
      return true;
    } catch {
      return false;
    }
  }

  async getLessons(): Promise<boolean> {
    try {
      const obs = this.http.get<Array<LessonModel>>(urls.lessons);
      const lessons = await firstValueFrom(obs);
      this.$lessons.next(lessons);
      return true;
    } catch {
      return false;
    }
  }

  async editLessonById(id: string, dto: LessonDto): Promise<boolean> {
    try {
      const obs = this.http.put<Array<LessonModel>>(urls.lessons + `/${id}`, dto);
      await firstValueFrom(obs);
      await this.getLessons();
      return true;
    } catch {
      return false;
    }
  }

  async deleteLessonById(id: string): Promise<boolean> {
    try {
      const obs = this.http.delete<Array<LessonModel>>(urls.lessons + `/${id}`);
      await firstValueFrom(obs);
      await this.getLessons();
      return true;
    } catch {
      return false;
    }
  }

  async createStudent(dto: StudentDto): Promise<boolean> {
    try {
      const obs = this.http.post<CommonResponseClass>(urls.students, dto);
      await firstValueFrom(obs);
      await this.getStudents();
      return true;
    } catch {
      return false;
    }
  }

  async getStudents(): Promise<boolean> {
    try {
      const obs = this.http.get<Array<StudentModel>>(urls.students);
      const students = await firstValueFrom(obs);
      this.$students.next(students);
      return true;
    } catch {
      return false;
    }
  }

  async editStudentById(id: string, dto: StudentDto): Promise<boolean> {
    try {
      const obs = this.http.put<Array<StudentModel>>(urls.students + `/${id}`, dto);
      await firstValueFrom(obs);
      await this.getStudents();
      return true;
    } catch {
      return false;
    }
  }

  async deleteStudentById(id: string): Promise<boolean> {
    try {
      const obs = this.http.delete<Array<StudentModel>>(urls.students + `/${id}`);
      await firstValueFrom(obs);
      await this.getStudents();
      return true;
    } catch {
      return false;
    }
  }

  async refresh(): Promise<void> {
    await this.getStudents();
    await this.getLessons();
    await this.getExams();
  }
}
