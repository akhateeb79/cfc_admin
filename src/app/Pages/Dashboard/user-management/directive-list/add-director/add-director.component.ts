import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { KYCService } from 'src/app/shared/Services/kyc.service';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';  // Import Location service

@Component({
  selector: 'app-add-director',
  templateUrl: './add-director.component.html',
  styleUrls: ['./add-director.component.css']
})
export class AddDirectorComponent implements OnInit {
  LANG = environment.english_translations;

  directorForm!: FormGroup;

  constructor(private fb: FormBuilder, private kycService: KYCService, private toast: ToastrManager,private location: Location ) {}

  ngOnInit(): void {
    this.directorForm = this.fb.group({
      psd_director_name: ['', Validators.required],
      psd_director_relation: ['', Validators.required],
      psd_director_nationality: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.directorForm.valid) {
      const formValue = this.directorForm.value;

      this.kycService.insertDirector(
        formValue.psd_director_name,
        formValue.psd_director_relation,
        formValue.psd_director_nationality
      ).subscribe(
        (response) => {
          this.toast.successToastr(this.LANG.Program_UPDATED_successfully);

          // Handle success, such as resetting the form or showing a success message
          this.directorForm.reset();
        },
        (error) => {
          console.error('Error updating program:', error);

          console.error('Error inserting director:', error);
          // Handle error, such as showing an error message
        }
      );
    } else {
      // Handle form validation errors
      console.warn('Form is invalid');
    }
  }

  goBack(): void {
    this.location.back();  // Navigate back to the previous page
  }
}