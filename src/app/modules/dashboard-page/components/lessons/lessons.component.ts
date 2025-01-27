import { Component, inject, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { firstValueFrom } from "rxjs";

import { GlobalService } from "../../../../common/services/global.service";
import { LessonModel } from "../../../../common/types/all.types";
import { LessonDialogComponent } from "./lesson-dialog/lesson-dialog.component";
import { DeleteDialogComponent } from "../../../../common/components/delete-dialog/delete-dialog.component";

@Component({
  selector: "app-lessons",
  standalone: true,
  imports: [],
  templateUrl: "./lessons.component.html",
})
export class LessonsComponent implements OnInit {
  readonly dialog = inject(MatDialog);

  constructor(public globalService: GlobalService) {}

  async ngOnInit(): Promise<void> {
    await this.globalService.refresh();
  }

  async openEditDialog(lesson: LessonModel) {
    const data = { mode: "edit", tableName: "lessons", obj: lesson };

    const dialogRef = this.dialog.open(LessonDialogComponent, {
      data,
      disableClose: true,
      minWidth: 280,
      maxWidth: 700,
      width: "60%",
    });

    await firstValueFrom(dialogRef.afterClosed());
  }

  async openDeleteDialog(lesson: LessonModel) {
    const data = { mode: "delete", tableName: "lessons", obj: lesson };

    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data,
      disableClose: true,
    });

    await firstValueFrom(dialogRef.afterClosed());
  }
}
