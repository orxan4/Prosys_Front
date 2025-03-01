import { Component, inject, OnInit } from "@angular/core";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { MatDrawer, MatDrawerContainer } from "@angular/material/sidenav";
import { MatIcon } from "@angular/material/icon";
import { MatDialog } from "@angular/material/dialog";
import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from "@angular/cdk/menu";
import { firstValueFrom } from "rxjs";

import { GlobalService } from "../../common/services/global.service";
import { LessonDialogComponent } from "./components/lessons/lesson-dialog/lesson-dialog.component";
import { ExamDialogComponent } from "./components/exams/components/exam-dialog/exam-dialog.component";
import { StudentDialogComponent } from "./components/students/student-dialog/student-dialog.component";

@Component({
  selector: "app-dashboard-page",
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    CdkMenuTrigger,
    CdkMenu,
    CdkMenuItem,
    MatIcon,
    MatDrawerContainer,
    MatDrawer,
  ],
  templateUrl: "./dashboard-page.component.html",
})
export class DashboardPageComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  constructor(public globalService: GlobalService) {}

  ngOnInit(): void {}

  async openCreateDialog(tableName: "lessons" | "exams" | "students"): Promise<void> {
    const createData = {
      lessons : {
        code: '',
        name: '',
        class: 1,
        teacherName: '',
        teacherSurname: '',
      },
      exams : {
        lessonCode: '',
        studentNumber: 1,
        examDate: 0,
        grade: 1,
      },
      students : {
        number: 1,
        name: '',
        surname: '',
        class: 1,
      },
    };

    const data = { mode: "create", tableName: tableName, obj: createData[tableName] };
    let component = null;
    if (tableName === "lessons") component = LessonDialogComponent;
    if (tableName === "exams") component = ExamDialogComponent;
    if (tableName === "students") component = StudentDialogComponent;

    const dialogRef = this.dialog.open(component, {
      data,
      disableClose: true,
      minWidth: 280,
      maxWidth: 700,
      width: "60%",
    });

    await firstValueFrom(dialogRef.afterClosed());
  }
}
