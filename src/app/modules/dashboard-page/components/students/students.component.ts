import { Component, inject, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { firstValueFrom } from "rxjs";

import { GlobalService } from "../../../../common/services/global.service";
import { StudentModel } from "../../../../common/types/all.types";
import { DeleteDialogComponent } from "../../../../common/components/delete-dialog/delete-dialog.component";
import { StudentDialogComponent } from "./student-dialog/student-dialog.component";

@Component({
  selector: "app-students",
  standalone: true,
  imports: [],
  templateUrl: "./students.component.html",
})
export class StudentsComponent implements OnInit {
  readonly dialog = inject(MatDialog);

  constructor(public globalService: GlobalService) {}

  async ngOnInit(): Promise<void> {
    await this.globalService.refresh();
  }

  async openEditDialog(student: StudentModel) {
    const data = { mode: "edit", tableName: "students", obj: student };

    const dialogRef = this.dialog.open(StudentDialogComponent, {
      data,
      disableClose: true,
      minWidth: 280,
      maxWidth: 700,
      width: "60%",
    });

    await firstValueFrom(dialogRef.afterClosed());
  }

  async openDeleteDialog(student: StudentModel) {
    const data = { mode: "delete", tableName: "students", obj: student };

    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data,
      disableClose: true,
    });

    await firstValueFrom(dialogRef.afterClosed());
  }
}
