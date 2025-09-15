import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoaderModule } from 'src/app/shared/loader/Loader.module';
import { InvestorBorrowerKYCDetailsComponent } from './investor-borrower-kycdetails.component';
import { InvsetorAgreementComponent } from '../invsetor-agreement/invsetor-agreement.component';
import { InvsetorAgreementModule } from '../invsetor-agreement/invsetor-agreement.module';




 
const ChildRoutes: Routes = [
    {
        path: 'kyc-details',
        component:InvestorBorrowerKYCDetailsComponent
      },
  ]

@NgModule({
  imports: [
    RouterModule.forChild(ChildRoutes),
    FormsModule,
    CommonModule,
    LoaderModule,
    InvsetorAgreementModule
  ],
  declarations:[
    InvestorBorrowerKYCDetailsComponent
  ]
})
export class InvestorBorrowerKYCDetailsModule { }
