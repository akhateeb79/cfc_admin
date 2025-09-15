
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../shared/Services/login.service';
import { SharedService } from '../../shared/Services/shared.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { environment } from 'src/environments/environment';
import { KYCService } from 'src/app/shared/Services/kyc.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OtpVerificationDialogComponent } from '../otp-verification-dialog/otp-verification-dialog.component';
declare const $: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  err: boolean = false;
  load: boolean = false;
  isOtpModalVisible = false;
  show_password: boolean = false;
  approval: Array<any> = [];
  otpCode: string = ''; // To store the OTP
  email_id: string = "";
  password: string = "";
  user_id: any
  loginError: any = {
    "email_id": false,
    "email_id_valid": false,
    "password": false,
    "password_valid": false,
  }
  LANG = environment.english_translations;

  constructor(private toastr: ToastrManager, private kycService: KYCService, private router: Router, private modalService: NgbModal, private loginService: LoginService, private shared: SharedService) { }

  ngOnInit() {

  }

  forgetPassword(type?: number) {
    if (type) {
      $("#recoverform").slideUp();
      $("#loginform").fadeIn();
      return
    }
    $("#loginform").slideUp();
    $("#recoverform").fadeIn();
  }

  errorHandler() {
    if (this.email_id == undefined || this.email_id == '') {
      this.loginError.email_id = true;
      this.err = true;
    }
    if (this.checkEmail(this.email_id) && !this.loginError.email_id) {
      this.loginError.email_id_valid = true;
      this.err = true;
    }
    if (this.password == undefined || this.password == '') {
      this.loginError.password = true;
      this.err = true;
    }
    if (!this.loginError.password && this.checkPassword(this.password)) {
      this.loginError.password_valid = true;
      this.err = true;
    }
  }

  checkEmail(email: string) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !re.test(email)
  }

  checkPassword(password: string) {
    if (password.length < 8) {
      return true
    }
    return
  }
  fetchWorkFlow(id: number): void {

    this.kycService.getapprovallevel(id).subscribe((response) => {

      // Check if response and response.response.data exist before proceeding
      if (!response || !response.response || !response.response.data) {
        console.error("No data found in response.");
        this.kycService.setPermissions([]); 
        return;
      }
      this.approval = response.response.data;

      // Check if approval array is empty
      if (this.approval.length === 0) {
        this.kycService.setPermissions([]);  
        return;
      }

      // Map permissions from the approval array
      const permissions = this.approval.map((item: any) => item.name);

      // Set permissions using the service
      this.kycService.setPermissions(permissions);

    }, (error) => {
      console.error("Error fetching workflow:", error);
    });
  }
  closeOtpModal() {
    this.router.navigate(['/']); // Close modal and navigate
  }

  verifyOtp() {
    // Add OTP verification logic here
    // console.log('Entered OTP:', this.otpCode);
    this.closeOtpModal(); // Close the modal after verification
  }
  openOtpModal() {
    const modalRef = this.modalService.open(OtpVerificationDialogComponent, {
      size: 'lg', // Optional: you can choose 'sm', 'lg', or 'xl' for modal size
      centered: true
    });
 
    // Pass userId and email to the modal
    modalRef.componentInstance.userId = this.user_id; 
    modalRef.componentInstance.email = this.email_id;
  
  }
  
  loginUser() {
    this.err = false;
    this.resetLoginError();
    this.errorHandler();
    if (this.err) return;
    this.load = true;
    const data = {
      "email": this.email_id,
      // "password": this.loginService.encryptPassword(this.password)
      "password": this.password
    }
    this.loginService.userLogin(data).subscribe((result: any) => {
      if (result.status) {

        this.kycService.sendOtpRegestration(data.email).subscribe(
          (otpResult: any) => {
            if (otpResult.status) {
             
              this.user_id = result.response.id;
              localStorage.setItem('name', result.response.name);
              localStorage.setItem('user-id', this.user_id);
              localStorage.setItem('email', this.email_id);
              localStorage.setItem("ice-web-dashboard", btoa("1"));
              localStorage.setItem("token", result.response.token);
              localStorage.setItem("type-role", result.response.role_type);
              localStorage.setItem(btoa(btoa(("user_info"))), btoa(btoa(unescape(encodeURIComponent(JSON.stringify(result.response))))));

              this.shared.changeUser(true);
              this.fetchWorkFlow(this.user_id)
              this.openOtpModal();
              this.toastr.infoToastr(otpResult.message || 'Successfully Send OTP.');

         

            } else {
              this.toastr.warningToastr(otpResult.message || 'Failed to send OTP.');
            }
          },
          (error) => {
            this.toastr.errorToastr('Error sending OTP. Please try again.');
          }
        );
      } else {
        this.toastr.warningToastr(result.response.message || 'Login failed.');
      }

      this.load = false;
    },
      (err) => {
        this.load = false;
        this.toastr.errorToastr(this.LANG.Something_went_wrong_Please_try_again_later);
      }
    );
  }

  resetLoginError() {
    this.loginError = {
      "email_id": false,
      "email_id_valid": false,
      "password": false,
      "password_valid": false,
    }
  }

}
