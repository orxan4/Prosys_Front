import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { ExamModel, LessonModel, StudentModel } from '../../types/all.types';
import { MatButton } from '@angular/material/button';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-delete-dialog',
  standalone: true,
  imports: [MatButton, MatDialogActions, MatDialogContent, MatDialogTitle],
  templateUrl: './delete-dialog.component.html',
})
export class DeleteDialogComponent {
  constructor(
    private globalService: GlobalService,
    private dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      mode: 'create' | 'edit' | 'delete';
      tableName: 'exams' | 'students' | 'lessons';
      obj: ExamModel | StudentModel | LessonModel;
    },
  ) {}

  async actuallyDelete(): Promise<boolean> {
    let fnName = 'deleteStudentById';

    if (this.data.tableName === 'exams') {
      fnName = 'deleteExamById';
    } else if (this.data.tableName === 'students') {
      fnName = 'deleteStudentById';
    } else if (this.data.tableName === 'lessons') {
      fnName = 'deleteLessonById';
    } else return true;

    return await this.globalService[fnName](this.data.obj.id);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  async onDelete(): Promise<void> {
    if (await this.actuallyDelete()) {
      this.dialogRef.close(true);
    }
  }
}
