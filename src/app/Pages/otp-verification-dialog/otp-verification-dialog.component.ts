import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { KYCService } from 'src/app/shared/Services/kyc.service';
import { SharedService } from 'src/app/shared/Services/shared.service';


@Component({
  selector: 'app-otp-verification-dialog',
  templateUrl: './otp-verification-dialog.component.html',
  styleUrls: ['./otp-verification-dialog.component.css']
})
export class OtpVerificationDialogComponent  {
  @Input() userId: string;
  @Input() approvallevelpath: boolean;

  @Input() email: string; // Pass email from the parent component
  otp: string[] = ['', '', '', '']; // Store OTP digits

  constructor(
    private toast:ToastrManager,
    public activeModal: NgbActiveModal,
    private router: Router,
    private KYCService: KYCService ,
    private shared:SharedService,// Inject OtpService
  ) {
  }

  // Close the modal
  close() {
    this.activeModal.dismiss();
  }

  // Move focus to the next input field after a number is entered
  moveFocus(event: Event, nextFieldId: string) {

    const target = event.target as HTMLInputElement;
    if (target.value.length === 1) {
      const nextField = document.getElementById(nextFieldId) as HTMLInputElement;
      if (nextField) {
        nextField.focus();
      }
    }
  }

  // Handle OTP form submission
  onSubmit() {

    if (this.otp.every(digit => String(digit).trim() !== '')) {
      const otpCode = this.otp.join('');

      this.KYCService.verifyOtp(this.email, otpCode).subscribe(
        (response: any) => {
          if (response.status) {

            this.shared.setOtpVerified(true);
            this.shared.changeUser(true);

            if (this.approvallevelpath) {

              // Show success notification without navigation
              this.toast.successToastr('OTP verified successfully.');
              this.activeModal.close('verified');
            } else {
              // Navigate to the dashboard with a toast message
              this.router.navigate(['/dashboard']).then(() => {
                this.toast.successToastr('OTP verified successfully. Redirecting to the dashboard.');
                this.activeModal.close('verified');
              });
            }
          } else {
            // Show error toast and navigate back to login
            console.error('OTP Verification Failed:', response.message);
            this.toast.errorToastr(response.message || 'OTP verification failed. Please try again.');
           ;
          }
        },
        (error) => {
          // Show error toast on request failure
          console.error('Error during OTP verification:', error);
          this.toast.errorToastr('An error occurred during OTP verification. Please try again.');
         
        }
      );
    } else {
      // Show error toast for incomplete OTP
      this.toast.errorToastr('Please enter all 4 digits of the OTP.');
    }
  }

}
  
