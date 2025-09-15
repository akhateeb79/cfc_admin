import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { KYCService } from 'src/app/shared/Services/kyc.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update-director',
  templateUrl: './update-director.component.html',
  styleUrls: ['./update-director.component.css']
})
export class UpdateDirectorComponent implements OnInit {

  @Input() programId!: number;  // ID passed from the parent component
  programForm: FormGroup;
  @Input() id!: number;  // ID passed from the parent component

  LANG = environment.english_translations;
  constructor(private fb: FormBuilder, private kycService: KYCService, public activeModal: NgbActiveModal, private toast: ToastrManager) {

  }
  ngOnInit(): void {
   

   
      this.programForm = this.fb.group({
        psd_director_name: ['', Validators.required],
        psd_director_relation: ['', Validators.required],
        psd_director_nationality: ['', Validators.required],
       
      });
      this.loadProgramData(this.id)
    
  }
  private loadProgramData(id: number) {
    
    this.kycService.getDirectors().subscribe(
      (data) => {
        this.programForm.patchValue(data);
      },
      (error) => {
        console.error('Error loading program data', error);
      }
    );
  }
  save(): void {
    if (this.programForm.valid) {
      const programData = this.programForm.value;
  
      // Destructure the form data to get director-related fields
      const { psd_director_name, psd_director_relation, psd_director_nationality } = programData;
  
      // Call the updateDirector method from the service
      this.kycService.updateDirector(this.id, psd_director_name, psd_director_relation, psd_director_nationality)
        .subscribe(
          (directorResponse) => {
            // Close the modal and show success message
            this.activeModal.close({ message: 'Data updated successfully' });
            this.toast.successToastr('Program and director updated successfully');
          },
          (error) => {
            console.error('Error updating director:', error);
            this.toast.warningToastr('Error updating director: ' + error.message);
          }
        );
    } else {

    }
  }
  
  dismiss() {
    this.activeModal.dismiss('Cancel click');
  }
}