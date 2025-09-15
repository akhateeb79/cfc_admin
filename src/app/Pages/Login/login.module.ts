import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoaderModule } from 'src/app/shared/loader/Loader.module';
import { OtpVerificationDialogComponent } from '../otp-verification-dialog/otp-verification-dialog.component';




 
const ChildRoutes: Routes = [
    {
        path: 'login',
        component:LoginComponent
      },

  
  ]

@NgModule({
  imports: [
    RouterModule.forChild(ChildRoutes),
    FormsModule,
    CommonModule,
    LoaderModule
  ],
  declarations:[
    LoginComponent
  ]
})
export class LoginModule { }
