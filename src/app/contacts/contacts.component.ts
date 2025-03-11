import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { IContactsFormErrors } from '../../types/Types';

@Component({
  selector: 'app-contacts',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css',
})
export class ContactsComponent {
  applyForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    message: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
  });
  formErrors: IContactsFormErrors = {
    firstName: false,
    lastName: false,
    email: false,
    message: false,
  };

  private getErrors() {
    const errors: {
      firstName: boolean;
      lastName: boolean;
      email: boolean;
      message: boolean;
    } = {
      firstName: false,
      lastName: false,
      email: false,
      message: false,
    };

    if (this.applyForm.controls.firstName.invalid) {
      errors.firstName = true;
    }
    if (this.applyForm.controls.lastName.invalid) {
      errors.lastName = true;
    }
    if (this.applyForm.controls.email.invalid) {
      errors.email = true;
    }
    if (this.applyForm.controls.message.invalid) {
      errors.message = true;
    }

    this.formErrors = errors;
  }

  submitApplication() {
    this.getErrors();

    if (Object.values(this.formErrors).some((error) => error)) {
      console.error('INVALID FORM', this.formErrors);
    } else {
      console.log('SUBMITTING FORM', this.applyForm.value);

      // Send form data to the server by service...
    }
  }
}
