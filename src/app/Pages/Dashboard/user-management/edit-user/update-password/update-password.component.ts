import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { UsersService } from 'src/app/shared/Services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {

  @Input() email!: string;
   programForm: FormGroup;
 
   LANG = environment.english_translations;
   constructor(private fb: FormBuilder, private usersService: UsersService, public activeModal: NgbActiveModal, private toast: ToastrManager) {
 
   }
   ngOnInit(): void {
    
    
       this.programForm = this.fb.group({
        email: ['', Validators.required],
         password: ['', Validators.required],
         confirmPassword: ['', Validators.required],
        
       }, { validators: this.passwordMatchValidator }
      );
       this.programForm.controls.email.patchValue(this.email);
     
   }
   passwordMatchValidator(form: AbstractControl): { [key: string]: boolean } | null {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    if (password && confirmPassword && password !== confirmPassword) {
      return { mismatch: true };
    }
    return null;
  }
   save(): void {
     if (this.programForm.valid) {
       const programData = this.programForm.value;
   
       const { email, password } = programData;
   
       this.usersService.changeUserPassword({email:email,password:password})
         .subscribe(
           (directorResponse) => {
             this.activeModal.close({ message: 'Password updated successfully' });
             this.toast.successToastr('Password updated successfully');
           },
           (error) => {
             console.error('Error updating password:', error);
             this.toast.warningToastr('Error updating password: ' + error.message);
           }
         );
     } else {
 
     }
   }
   
   dismiss() {
     this.activeModal.dismiss('Cancel click');
   }

}
