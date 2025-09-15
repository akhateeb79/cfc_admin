import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { forkJoin } from 'rxjs';
import { KYCService } from 'src/app/shared/Services/kyc.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-preview-level-workflow',
  templateUrl: './preview-level-workflow.component.html',
  styleUrls: ['./preview-level-workflow.component.css']
})
export class PreviewLevelWorkflowComponent implements OnInit {
  @Input() requestData: any;       // Input property to receive the data
  @Input() acceptedId: number;     // Input for the accepted ID

  fromAccount: string = '';
  toAccount: string = '';
  amount: number | null = null;    // Assuming amount is a number
  requestNumber: any;
  userId: any;
  LANG=environment.english_translations;
  @Input() displayAsTable: boolean = false; // Receive the boolean value

  constructor(public activeModal: NgbActiveModal, private kycService: KYCService, private toast: ToastrManager) {}

  ngOnInit(): void {

    // Check and parse requestData on init
    if (this.requestData && this.requestData.request) {
      const parsedRequest = JSON.parse(this.requestData.request);
      this.fromAccount = parsedRequest.fromAccount;
      this.toAccount = parsedRequest.toAccount;
      this.amount = parsedRequest.amount;

      // Extract additional details from requestData
      this.userId = localStorage.getItem('user-id');
      this.requestNumber = this.requestData.request_number;
      this.checkStatus();
    } else {
   
    }
  }

  // Generate a unique request number based on current timestamp
  generateRequestNumber(): string {
    const date = new Date();
    const uniqueId = date.getTime(); // Get the current timestamp
    return `REQ-${uniqueId}`; // Format as "REQ-<timestamp>"
  }

  // Check the status and log the result
  checkStatus() {
    if (this.requestData && this.requestData.status) {
    } else {
     
    }
  }

 
handleAcceptance(status: string) {

  // Prevent action if current status is not "Pending"
  if (this.requestData?.status !== '2') {
    return;
  }

  const workflowStatus = status === 'accept' ? 1 : 0;
  const requestData = {
    fromAccount: this.fromAccount,
    toAccount: this.toAccount,
    amount: this.amount
  };


  // Define both API calls
  const updateWorkflowInstance$ = this.kycService.updateWorkflowInstance(
    this.requestData.id,
    workflowStatus
  );

  const addWorkflowInstance$ = this.kycService.addWorkflowInstance(
    this.requestData.work_flow_id,
    this.userId,
    this.requestData.request_number,
   "preview",
    workflowStatus,
    requestData
  );

  // Execute both API calls concurrently using forkJoin
  forkJoin([updateWorkflowInstance$, addWorkflowInstance$]).subscribe(
    ([updateResponse, addResponse]) => {

      // Close modal with both responses
      this.activeModal.close({ 
        status: workflowStatus, 
        updateResponse,
        addResponse
      });

      // Show success toast notification
      this.toast.successToastr(this.LANG.updated_successfully);
      
      // Optionally dismiss the modal or perform additional actions
      this.confirm();
    },
    (error) => {
      console.error('Error in workflow instance requests:', error);
      this.toast.errorToastr(this.LANG.Something_went_wrong_Please_try_again_later);
    }
  );
}
  // Close modal on confirmation
dismiss() {
  try {
    this.activeModal.dismiss('cancel');
  } catch (error) {
    console.error('Modal dismissal failed:', error);
  }
}

confirm() {
  try {
    this.activeModal.close('confirm');
  } catch (error) {
    console.error('Modal confirmation failed:', error);
  }
}
}
