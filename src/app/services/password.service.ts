import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class PasswordService {
  constructor() {}

  passwordComplexityValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value: string = control.value || '';

      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumber = /\d/.test(value);
      const hasMinLength = value.length >= 4;

      const isValid = hasUpperCase && hasLowerCase && hasNumber && hasMinLength;

      return isValid ? null : { passwordComplexity: true };
    };
  }
}
