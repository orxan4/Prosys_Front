import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatHint, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { NgForOf, NgIf } from '@angular/common';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { BehaviorSubject } from 'rxjs';

import { ExamModel } from '../../../../../../common/types/all.types';
import { GlobalService } from '../../../../../../common/services/global.service';

@Component({
  selector: "app-exam-dialog",
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    NgIf,
    ReactiveFormsModule,
    MatSelect,
    MatOption,
    NgForOf,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatHint,
    MatIconModule,
    MatSuffix,
  ],
  templateUrl: "./exam-dialog.component.html",
})
export class ExamDialogComponent implements OnInit {
  minDate: Date = new Date(1980, 0, 1);
  maxDate: Date = new Date();
  examForm: FormGroup = new FormGroup({});
  originalData: ExamModel | Record<string, null> = {
    lessonCode: null,
    studentNumber: null,
    examDate: null,
    grade: null,
  };
  dataUnChanged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private fb: FormBuilder,
    protected globalService: GlobalService,
    private dialogRef: MatDialogRef<ExamDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      mode: "create" | "edit";
      tableName: "exams";
      obj: ExamModel | null;
    },
  ) {}

  ngOnInit(): void {
    this.originalData = JSON.parse(JSON.stringify(this.data.obj));

    this.examForm = this.fb.group({
      lessonCode: [
        this.data.mode === "create" ? null : this.data.obj.lessonCode,
        [Validators.required, Validators.minLength(3), Validators.maxLength(3)],
      ],
      studentNumber: [
        this.data.mode === "create" ? null : this.data.obj.studentNumber,
        [
          Validators.required,
          Validators.min(1),
          Validators.max(99999),
          Validators.pattern("^[0-9]*$"),
        ],
      ],
      examDate: [
        this.data.mode === "create" ? null : this.data.obj.examDate,
        [Validators.required],
      ],
      grade: [
        this.data.mode === "create" ? null : this.data.obj.grade,
        [
          Validators.required,
          Validators.min(0),
          Validators.max(9),
          Validators.pattern("^[0-9]*$"),
        ],
      ],
    });

    this.examForm.valueChanges.subscribe((value) => {
      this.dataUnChanged.next(
        Object.keys(value).every(
          (key) =>
            value[key as keyof ExamModel] ===
            this.originalData[key as keyof ExamModel],
        ),
      );
    });
    // for triggering valueChanges (purpose to check if changed in edit)
    this.examForm.patchValue({ name: this.data.obj.grade });
  }

  getErrorMessage(controlName: string): string {
    const control = this.examForm.get(controlName);
    if (control?.hasError("min")) return "Value is too low";
    if (control?.hasError("max")) return "Value is too high";
    if (control?.hasError("pattern")) return "Invalid format";
    if (control?.hasError("required")) return "This field is required";
    if (control?.hasError("minlength")) return "Too short";
    if (control?.hasError("maxlength")) return "Too long";
    return "";
  }

  async actuallySubmit(): Promise<boolean> {
    const preObj = this.examForm.value;
    const obj = {
      lessonCode: preObj.lessonCode,
      studentNumber: Number(preObj.studentNumber),
      grade: Number(preObj.grade),
      examDate: new Date(preObj.examDate).getTime(),
    };
    let result: boolean;
    if (this.data.mode === "create") {
      result = await this.globalService.createExam(obj);
    } else {
      result = await this.globalService.editExamById(this.data.obj.id, obj);
    }
    return result;
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  async onSubmit(): Promise<void> {
    if (await this.actuallySubmit()) {
      this.dialogRef.close(true);
    }
  }
}
