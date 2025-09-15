import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { KYCService } from 'src/app/shared/Services/kyc.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-workflow',
  templateUrl: './add-workflow.component.html',
  styleUrls: ['./add-workflow.component.css']
})
export class AddWorkflowComponent implements OnInit {
  workflowform: FormGroup;
  LANG = environment.english_translations;

  constructor(private route: ActivatedRoute, private kycService: KYCService,public activeModal: NgbActiveModal,  private toast: ToastrManager, private modalService: NgbModal, private router: Router) { }

  ngOnInit() {
    // Call the private method to initialize the form
    this.initializeForm();
  }

  // Private method to initialize the form
  private initializeForm() {
    this.workflowform = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
  }

  
save(){
  if (this.workflowform.valid) {
    const name = this.workflowform.get('name')?.value;
    const description = this.workflowform.get('description')?.value;



    // Call the service to add workflow
    this.kycService.addworkflow(name, description).subscribe(
      (response) => {
        this.activeModal.close({ message: ' Workflow_added_successfully' });
        this.toast.successToastr(this.LANG.Workflow_added_successfully);
      },
      (error) => {
        console.error('Error updating program:', error);
        this.toast.warningToastr(error.message);
      }
    );
  } else {
    console.warn('Form is not valid.'); 
  }
}
  onSubmit() {
 
  }
  dismiss() {
    this.activeModal.dismiss('Cancel click');
  }
  
}