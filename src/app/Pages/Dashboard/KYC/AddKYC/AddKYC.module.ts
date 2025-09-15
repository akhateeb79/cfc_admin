import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoaderModule } from 'src/app/shared/loader/Loader.module';
import { AddKycComponent } from './AddKYC.component';




 
const ChildRoutes: Routes = [
    {
        path: 'add-kyc',
        component:AddKycComponent
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
    AddKycComponent
  ]
})
export class AddKYCModule { }
