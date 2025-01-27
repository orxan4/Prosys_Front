import { Routes } from '@angular/router';

import { loggedInGuard } from './common/guards/logged-in.guard';
import { notLoggedInGuard } from './common/guards/not-logged-in.guard';

import { LoginPageComponent } from './modules/login-page/login-page.component';
import { DashboardPageComponent } from './modules/dashboard-page/dashboard-page.component';
import { ExamsComponent } from './modules/dashboard-page/components/exams/exams.component';
import { LessonsComponent } from './modules/dashboard-page/components/lessons/lessons.component';
import { StudentsComponent } from './modules/dashboard-page/components/students/students.component';
import { NotFoundPageComponent } from './modules/not-found-page/not-found-page.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/login',
  },
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [loggedInGuard],
  },
  {
    path: 'dashboard',
    component: DashboardPageComponent,
    canActivate: [notLoggedInGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'lessons' },
      { path: 'exams', component: ExamsComponent },
      { path: 'lessons', component: LessonsComponent },
      { path: 'students', component: StudentsComponent },
    ],
  },
  {
    path: '**',
    component: NotFoundPageComponent,
  },
];
