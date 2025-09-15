import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoaderModule } from 'src/app/shared/loader/Loader.module';
import { AddLoanComponent } from './add-loan.component';
import { AddPaymentInfoModule } from '../../PaymentManagement/add-payment-info/add-payment-info.module';




 
const ChildRoutes: Routes = [
    {
      path: 'add-loan',
      component:AddLoanComponent
    },
  ]

@NgModule({
  imports: [
    RouterModule.forChild(ChildRoutes),
    FormsModule,
    CommonModule,
    LoaderModule,
    AddPaymentInfoModule
  ],
  declarations:[
    AddLoanComponent
  ],
  exports:[AddLoanComponent]
})
export class AddLoanModule { }
