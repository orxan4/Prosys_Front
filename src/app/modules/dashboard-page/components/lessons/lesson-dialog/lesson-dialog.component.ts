import { Component, Inject, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { LessonModel } from '../../../../../common/types/all.types';
import { GlobalService } from '../../../../../common/services/global.service';

@Component({
  selector: 'app-lesson-dialog',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatFormField,
    MatInput,
    MatLabel,
    NgIf,
    ReactiveFormsModule,
  ],
  templateUrl: './lesson-dialog.component.html',
})
export class LessonDialogComponent implements OnInit {
  lessonForm: FormGroup = new FormGroup({});
  originalData: LessonModel | Record<string, null> = {
    code: null,
    name: null,
    class: null,
    teacherName: null,
    teacherSurname: null,
  };
  dataUnChanged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private fb: FormBuilder,
    private globalService: GlobalService,
    private dialogRef: MatDialogRef<LessonDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      mode: 'create' | 'edit';
      tableName: 'lessons';
      obj: LessonModel | null;
    },
  ) {}

  ngOnInit(): void {
    this.originalData = JSON.parse(JSON.stringify(this.data.obj));

    this.lessonForm = this.fb.group({
      code: [
        this.data.mode === 'create' ? null : this.data.obj.code,
        [Validators.required, Validators.minLength(3), Validators.maxLength(3)],
      ],
      name: [
        this.data.mode === 'create' ? null : this.data.obj.name,
        [Validators.required, Validators.minLength(1), Validators.maxLength(30)],
      ],
      class: [
        this.data.mode === 'create' ? null : this.data.obj.class,
        [Validators.required, Validators.min(1), Validators.max(99), Validators.pattern('^[0-9]*$')],
      ],
      teacherName: [
        this.data.mode === 'create' ? null : this.data.obj.teacherName,
        [Validators.required, Validators.minLength(1), Validators.maxLength(20)],
      ],
      teacherSurname: [
        this.data.mode === 'create' ? null : this.data.obj.teacherSurname,
        [Validators.required, Validators.minLength(1), Validators.maxLength(20)],
      ],
    });

    this.lessonForm.valueChanges.subscribe((value) => {
      this.dataUnChanged.next(
        Object.keys(value).every(
          (key) => value[key as keyof LessonModel] === this.originalData[key as keyof LessonModel],
        ),
      );
    });
    // for triggering valueChanges (purpose to check if changed in edit)
    this.lessonForm.patchValue({ name: this.data.obj.name });
  }

  getErrorMessage(controlName: string): string {
    const control = this.lessonForm.get(controlName);
    if (control?.hasError('min')) return 'Value is too low';
    if (control?.hasError('max')) return 'Value is too high';
    if (control?.hasError('required')) return 'This field is required';
    if (control?.hasError('pattern')) return 'Invalid format';
    if (control?.hasError('minlength')) return 'Too short';
    if (control?.hasError('maxlength')) return 'Too long';
    return '';
  }

  async actuallySubmit(): Promise<boolean> {
    const preObj = this.lessonForm.value;
    const obj = { ...preObj, class: Number(preObj.class) };
    let result: boolean;
    if (this.data.mode === 'create') {
      result = await this.globalService.createLesson(obj);
    } else {
      result = await this.globalService.editLessonById(this.data.obj.id, obj);
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
