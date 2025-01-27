import { Component, inject, OnInit } from "@angular/core";
import { DatePipe } from "@angular/common";
import { MatDialog } from "@angular/material/dialog";
import { firstValueFrom } from "rxjs";

import { GlobalService } from "../../../../common/services/global.service";
import { ExamModel } from "../../../../common/types/all.types";
import { DeleteDialogComponent } from "../../../../common/components/delete-dialog/delete-dialog.component";
import { ExamDialogComponent } from "./components/exam-dialog/exam-dialog.component";

@Component({
  selector: "app-exams",
  standalone: true,
  imports: [DatePipe],
  templateUrl: "./exams.component.html",
})
export class ExamsComponent implements OnInit {
  readonly dialog = inject(MatDialog);

  constructor(public globalService: GlobalService) {}

  async ngOnInit(): Promise<void> {
    await this.globalService.refresh();
  }

  async openEditDialog(exam: ExamModel) {
    const data = { mode: "edit", tableName: "exams", obj: exam };

    const dialogRef = this.dialog.open(ExamDialogComponent, {
      data,
      disableClose: true,
      minWidth: 280,
      maxWidth: 700,
      width: "60%",
    });

    await firstValueFrom(dialogRef.afterClosed());
  }

  async openDeleteDialog(exam: ExamModel) {
    const data = { mode: "delete", tableName: "exams", obj: exam };

    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data,
      disableClose: true,
    });

    await firstValueFrom(dialogRef.afterClosed());
  }
}
