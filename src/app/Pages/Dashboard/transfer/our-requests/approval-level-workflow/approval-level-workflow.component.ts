import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { forkJoin } from 'rxjs';
import { OtpVerificationDialogComponent } from 'src/app/Pages/otp-verification-dialog/otp-verification-dialog.component';
import { KYCService } from 'src/app/shared/Services/kyc.service';
import { UsersService } from 'src/app/shared/Services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-approval-level-workflow',
  templateUrl: './approval-level-workflow.component.html',
  styleUrls: ['./approval-level-workflow.component.css']
})
export class ApprovalLevelWorkflowComponent implements OnInit {

  @Input() requestData: any; // Define an input property to receive the data
  @Input() acceptedId: number; // For the accepted ID
  @Input() displayAsTable: boolean = false; // Receive the boolean value
  @Input() displayAsTable5: boolean = false; // Receive the boolean value
  @Input() approvallevelpath: boolean = true; // Receive the boolean value

  fromAccount: string = "";
  toAccount: any = null;
  loading: boolean = false;
  error: string = "";
  info: any = null;
  fromAccounts: any = ["0108095517580016", "0190095517580017", "0108095517580018"];
  toAccounts: any = ["0108095517580016", "0190095517580017", "0108095517580018"];
  amount: any = 0;
  userList: any[] = [];
  pickedAccountData: any;
  @Input()itemId:any;
  @Input()approvalLevelId:any;
  pickedBank:any;
  userId: any;
  emailid: any;
  transformedData:any
  requestNumber: any;
  parsedRequest:any
  savedPayloadString:any
  LANG=environment.english_translations;
  constructor(public activeModal: NgbActiveModal,private kycService: KYCService,private modalService: NgbModal,private toastr: ToastrManager,private usersService: UsersService, private toast: ToastrManager) {}
  ngOnInit(): void {
    
     this.savedPayloadString = localStorage.getItem('requestPayload');

    // Check and parse requestData on init
    if (this.requestData && this.requestData.request) {
      const parsedRequest = JSON.parse(this.requestData.request);

      this.fromAccount = parsedRequest.fromAccount;
      this.toAccount = parsedRequest.toAccount;
      this.amount = parsedRequest.amount;
      if (parsedRequest.request) {
        this.transformedData = {
          id: parsedRequest.request
          .map(item => item.id)
        };
  
      }
    
      // Extract additional details from requestData

      this.userId = localStorage.getItem('user-id');
      this.emailid = localStorage.getItem('email');
      this.requestNumber = this.generateRequestNumber();
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
    console.error('No status found or status is undefined');
  }
}

openOtpModal(onVerifiedCallback: () => void) {
  const emailFromStorage = localStorage.getItem('name');
  const modalRef = this.modalService.open(OtpVerificationDialogComponent, {
    size: 'lg', // optional: choose 'sm', 'lg', or 'xl' for modal size
    centered: true,
    backdrop: 'static', // prevent closing by clicking outside
    keyboard: false, // prevent closing with keyboard
  });

  modalRef.componentInstance.email = this.emailid;
  modalRef.componentInstance.displayAsTable = this.displayAsTable;
  modalRef.componentInstance.displayAsTable5 = this.displayAsTable5;
  modalRef.componentInstance.approvallevelpath = this.approvallevelpath;

  // Handle the result of the modal
  modalRef.result.then(
    (result) => {
      if (result === 'verified') {
        onVerifiedCallback();  // Execute the passed callback after verification
        this.dismiss()
      } else {
        this.toastr.warningToastr('OTP verification failed.');
      }
    },
    (dismissReason) => {
      console.warn('OTP modal dismissed:', dismissReason);
      this.toastr.warningToastr('OTP verification was canceled.');
    }
  );
}
transferBalance() {
  // Show loading state and clear previous messages
  this.loading = true;
  this.error = "";
  this.info = null;

  // Send OTP first
  this.kycService.sendOtpRegestration(this.emailid).subscribe(
    (otpResult: any) => {
      if (otpResult.status) {
        this.toastr.infoToastr(otpResult.message || 'Successfully sent OTP.');

        // Open OTP modal and pass a callback to proceed with transfer after OTP verification
        this.openOtpModal(() => {
          // Proceed with the transfer only after OTP verification
          this.usersService
            .transferBetweenTwoAccounts(
              this.amount,
              this.pickedAccountData.creditAccount,
              this.fromAccount,
              this.pickedAccountData.bic,
              this.pickedAccountData.user_id
            )
            .subscribe(
              (data: any) => {
                this.loading = false;

                if (data.status) {
                  this.info = data.response;
                  this.dismiss()

                  this.toast.successToastr(this.LANG.updated_successfully);
                }
                this.dismiss()
               
              },
              (error) => {
                this.loading = false;
                this.dismiss()

                this.error = "An error occurred while transferring funds.";
                this.toast.errorToastr(this.LANG.Something_went_wrong_Please_try_again_later);

              }
            );
        });
      } else {
        this.loading = false;
        this.dismiss()

        this.toastr.warningToastr(otpResult.message || 'Failed to send OTP.');

      }
    },
    (error) => {
      this.loading = false;
      this.dismiss()

      this.toastr.errorToastr('Error sending OTP. Please try again.');

    }
  );
}

onUserSelect(opportunity_id: any) {
  this.kycService.sendOtpRegestration(this.emailid).subscribe(
    (otpResult: any) => {
      if (otpResult.status) {
        // OTP sent successfully
        this.toastr.infoToastr(otpResult.message || 'Successfully sent OTP.');
    
        // Open OTP modal and pass a callback to handle the result
        this.openOtpModal(() => {
          // Callback after OTP verification, proceed with the logic for the opportunity
          this.usersService.getotppertinityById(opportunity_id).subscribe((response: any) => {
            this.toast.successToastr(this.LANG.updated_successfully);
            this.dismiss()
          });
        });
      } else {
        // If OTP sending fails
        this.toastr.warningToastr(otpResult.message || 'Failed to send OTP.');
        this.dismiss()
      }
    },
    (error) => {
      // Handle OTP send error
      this.toastr.errorToastr('Error sending OTP. Please try again.');
      this.dismiss()
    }
  );
}
pay() {

  // First, send OTP for registration
  this.kycService.sendOtpRegestration(this.emailid).subscribe(
    (otpResult: any) => {
      if (otpResult.status) {
        // OTP sent successfully
        this.toastr.infoToastr(otpResult.message || 'Successfully sent OTP.');

        // Open OTP modal and pass a callback to proceed with funds transfer after OTP is verified
        this.openOtpModal(() => {
          // Proceed with the funds transfer only after OTP verification is successful
          this.transferFunds();
        });

      } else {
        // If OTP sending fails
        this.toastr.warningToastr(otpResult.message || 'Failed to send OTP.');
        this.dismiss()

      }
    },
    (error) => {
      // Handle OTP send error
      this.toastr.errorToastr('Error sending OTP. Please try again.');
    }
  );
}

// Method to handle the transfer of funds
transferFunds() {
  this.loading = true;  // Set loading to true before starting the request
  
  // Use the postData method from your API service to send the IDs
  this.usersService.postData( this.transformedData).subscribe(
    (response) => {
      this.loading = false;  // Set loading to false after the request completes

      // Handle the response from the API
      if (response.status) {
        this.info = response.response;  // Assuming `response.response` contains the transfer details
        this.toast.successToastr(this.LANG.updated_successfully);  // Show success toast
        this.dismiss()
      } else {
        // If the response status is not successful
        this.toast.errorToastr(this.LANG.Something_went_wrong_Please_try_again_later);
        this.dismiss()
      }
    },
    (error) => {
      // Handle error when transferring funds
      this.loading = false;  // Set loading to false in case of error
      this.toast.errorToastr(this.LANG.Something_went_wrong_Please_try_again_later);
      this.dismiss()
    }
  );
}

handleAcceptance(status: string) {
  // Set the status based on acceptance/rejection
  const workflowStatus = status === 'accept' ? 3 : 4;

  const requestData = {
    fromAccount: this.fromAccount,
    toAccount: this.toAccount,
    amount: this.amount,
  };
  

  // Define both requests
  const updateWorkflowInstance$ = this.kycService.updateWorkflowInstance(
    this.requestData.id,
    workflowStatus // approval_level_id
  );
  const addWorkflowInstance$ = this.kycService.addWorkflowInstance(
    this.requestData.work_flow_id,
    this.userId,
    this.requestData.request_number,
    "Approval",
    workflowStatus,
    requestData
  );

  // Execute both requests concurrently
  forkJoin([updateWorkflowInstance$, addWorkflowInstance$]).subscribe(
    ([updateResponse, addResponse]) => {
      
      // Close modal and show success message
      this.activeModal.close({ response: addResponse, status: workflowStatus });
      this.toast.successToastr(this.LANG.updated_successfully);

      // Optionally dismiss the modal
      this.confirm();
    },
    (error) => {
      console.error('Error in workflow instance requests:', error);
      this.toast.errorToastr(this.LANG.Something_went_wrong_Please_try_again_later);
    }
  );
}
 confirm() {
    this.activeModal.close('confirm');
  }

  dismiss() {
    this.activeModal.dismiss('cancel');
  }
}