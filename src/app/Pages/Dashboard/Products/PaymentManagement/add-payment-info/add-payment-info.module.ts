import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoaderModule } from 'src/app/shared/loader/Loader.module';
import { AddPaymentInfoComponent } from './add-payment-info.component';




 
const ChildRoutes: Routes = [
    {
        path: 'payment-info',
        component:AddPaymentInfoComponent
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
    AddPaymentInfoComponent
  ],
  exports:[
    AddPaymentInfoComponent
  ]
})
export class AddPaymentInfoModule { }
