import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

import { GlobalService } from '../../../../../common/services/global.service';
import { StudentModel } from '../../../../../common/types/all.types';

@Component({
  selector: 'app-student-dialog',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatFormField,
    MatInput,
    MatButton,
    ReactiveFormsModule,
    MatLabel,
    NgIf,
  ],
  templateUrl: './student-dialog.component.html',
})
export class StudentDialogComponent implements OnInit {
  studentForm: FormGroup = new FormGroup({});
  originalData: StudentModel | Record<string, null> = {
    number: null,
    name: null,
    surname: null,
    class: null,
  };
  dataUnChanged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private fb: FormBuilder,
    private globalService: GlobalService,
    private dialogRef: MatDialogRef<StudentDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      mode: 'create' | 'edit';
      tableName: 'students';
      obj: StudentModel | null;
    },
  ) {}

  ngOnInit(): void {
    this.originalData = JSON.parse(JSON.stringify(this.data.obj));

    this.studentForm = this.fb.group({
      number: [
        this.data.mode === 'create' ? null : this.data.obj.number,
        [Validators.required, Validators.min(1), Validators.max(99999), Validators.pattern('^[0-9]*$')],
      ],
      name: [
        this.data.mode === 'create' ? null : this.data.obj.name,
        [Validators.required, Validators.minLength(1), Validators.maxLength(30)],
      ],
      surname: [
        this.data.mode === 'create' ? null : this.data.obj.surname,
        [Validators.required, Validators.minLength(1), Validators.maxLength(30)],
      ],
      class: [
        this.data.mode === 'create' ? null : this.data.obj.class,
        [Validators.required, Validators.min(1), Validators.max(99), Validators.pattern('^[0-9]*$')],
      ],
    });

    this.studentForm.valueChanges.subscribe((value) => {
      this.dataUnChanged.next(
        Object.keys(value).every(
          (key) => value[key as keyof StudentModel] === this.originalData[key as keyof StudentModel],
        ),
      );
    });
    // for triggering valueChanges (purpose to check if changed in edit)
    this.studentForm.patchValue({ name: this.data.obj.name });
  }

  getErrorMessage(controlName: string): string {
    const control = this.studentForm.get(controlName);
    if (control?.hasError('required')) return 'This field is required';
    if (control?.hasError('min')) return 'Value is too low';
    if (control?.hasError('max')) return 'Value is too high';
    if (control?.hasError('pattern')) return 'Invalid format';
    if (control?.hasError('minlength')) return 'Too short';
    if (control?.hasError('maxlength')) return 'Too long';
    return '';
  }

  async actuallySubmit(): Promise<boolean> {
    const preObj = this.studentForm.value;
    const obj = { ...preObj, number: Number(preObj.number), class: Number(preObj.class) };
    let result: boolean;
    if (this.data.mode === 'create') {
      result = await this.globalService.createStudent(obj);
    } else {
      result = await this.globalService.editStudentById(this.data.obj.id, obj);
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
