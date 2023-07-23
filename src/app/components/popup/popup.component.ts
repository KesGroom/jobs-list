import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertsService } from 'src/app/alerts.service';
import { Job } from 'src/app/interfaces';
import { JobsListService } from 'src/app/modules/jobs-list/jobs-list.service';

@Component({
  selector: 'popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class PopupComponent implements OnInit {

  public cardPopUpState: 'entry' | 'out' = 'entry';
  public applyForm: FormGroup;
  public formElements: any[] = [
    {
      controlname: 'fullname',
      labeltext: 'Full Name',
      placeholder: 'Kevin Sanchez',
      type: 'input',
      required: true,
      validators: [
        Validators.required,
        Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ]+$'),
        Validators.minLength(2)
      ],
      errors: {
        'required': 'This field is required.',
        'pattern': 'Please enter a valid name without special characters or numbers.',
        'minlength': 'The minimum number of characters allowed is two.'
      }
    },
    {
      controlname: 'email',
      labeltext: 'Email',
      placeholder: 'kevin.sanchez8117@gmail.com',
      type: 'input',
      required: true,
      validators: [
        Validators.required,
        Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
      ],
      errors: {
        'required': 'This field is required.',
        'pattern': 'The email you entered is invalid. Please try again.',
      }
    },
    {
      controlname: 'phone',
      labeltext: 'Phone',
      placeholder: '+57 3133734481',
      type: 'input',
      required: true,
      validators: [
        Validators.required,
        Validators.pattern(/^\+\d{1,3}\s\d{6,}$/),
      ],
      errors: {
        'required': 'This field is required.',
        'pattern': 'The phone you entered is invalid. Please try again.',
      }
    },
    {
      controlname: 'status',
      labeltext: 'Status',
      type: 'select',
      required: true,
      validators: [
        Validators.required,
      ],
      errors: {
        'required': 'This field is required.',
      },
      options: [
        { value: '', label: 'Select...', default: true, disabled: true },
        { value: '0', label: 'Citizen', default: false },
        { value: '1', label: 'Work Permit', default: false },
        { value: '2', label: 'Student', default: false },
        { value: '3', label: 'Permanent Resident', default: false }
      ]
    },
    {
      controlname: 'gender',
      labeltext: 'Gender',
      type: 'select',
      required: true,
      validators: [
        Validators.required,
      ],
      errors: {
        'required': 'This field is required.',
      },
      options: [
        { value: '', label: 'Select...', default: true, disabled: true },
        { value: '0', label: 'Female', default: false },
        { value: '1', label: 'Male', default: false },
        { value: '2', label: 'Prefer not specified', default: false },
      ]
    },
    {
      controlname: 'address',
      labeltext: 'Address',
      placeholder: '123 Main Street, Toronto, ON, Canada',
      type: 'input',
      required: false,
      validators: [
        Validators.minLength(10)
      ],
      errors: {
        'minlength': 'Please enter a more detailed address with at least 10 characters.',
      },
    },
    {
      controlname: 'skills',
      labeltext: 'Skills',
      placeholder: 'Type skill and Press Enter',
      type: 'chips',
      required: false,
      validators: [],
      chips: []
    },
    {
      controlname: 'postal',
      labeltext: 'Postal Code',
      placeholder: 'A1A 1A1',
      type: 'input',
      required: false,
      validators: [
        Validators.minLength(6)
      ],
      errors: {
        'minlength': 'The postal code you entered is invalid. Please try again.',
      },
    },
    {
      controlname: 'transport',
      labeltext: 'Have transportation?',
      type: 'radio',
      required: true,
      validators: [
        Validators.required
      ],
      errors: {
        'required': 'This field is required.',
      },
      options: [
        { value: '0', label: 'Yes', default: false },
        { value: '1', label: 'False', default: true },
      ]
    },
    {
      controlname: 'terms',
      labeltext: 'I agree Terms and Conditions & Privacy Policy.',
      type: 'checkbox',
      required: true,
      validators: [
        Validators.required
      ],
      errors: {
        'required': 'This field is required.',
      },
    },
  ]

  constructor(
    public _jobs: JobsListService,
    private _fb: FormBuilder,
    public _alerts: AlertsService
  ) {
    // create form group for applying to job postings
    this.applyForm = _fb.nonNullable.group({});
    this.formElements.map((formElement) => {
      this.applyForm.addControl(formElement.controlname, _fb.nonNullable.control(
        ['radio', 'select'].includes(formElement.type) ? formElement.options.find((option: any) => option.default).value
          : ''
        , formElement.validators));
    });
  }

  ngOnInit() {
    this._alerts.$popUpState.subscribe({
      next: (state: boolean) => {
        if (state) {
          this._alerts.showPopUp = state;
          this.cardPopUpState = 'entry';
        } else {
          this.cardPopUpState = 'out';
          this.applyForm.reset();
          setTimeout(() => {
            this._alerts.showPopUp = state;
          }, 500)
        }
      }
    })
  }

  public close() {
    this._alerts.$popUpState.next(false);
  }

  public getError(formControl: AbstractControl, errors: any) {
    if (formControl.errors) {
      console.log(Object.keys(formControl.errors));

      const error = errors[Object.keys(formControl.errors)[0]];
      return `${error}`;
    }
    return '';
  }

  public addChip(event: any, formElement: any) {
    if (formElement.type === 'chips' && event.key === 'Enter') {
      if (!formElement.chips.includes(this.applyForm.controls[formElement.controlname].value.toLowerCase())) {
        formElement.chips.push(`${this.applyForm.controls[formElement.controlname].value.toLowerCase()}`);
      }
      this.applyForm.controls[formElement.controlname].reset();
    }
  }

  public deleteChip(chipSelect: string, formElement: any) {
    formElement.chips = formElement.chips.filter((chip: string) => chip != chipSelect);
  }

  public checkErrorAndSend() {
    if (this.applyForm.valid) {
      this._alerts.setToast(`You have successfully applied for the position of ${this._jobs.jobs.find((job: Job) => job.numberId === this._jobs.jobIdSelect)?.title}`, 'blue');
      this.close();
    }
  }

}
