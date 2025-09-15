import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoaderModule } from 'src/app/shared/loader/Loader.module';
import { InvestorBorrowerKYCComponent } from './investor-borrower-kyc.component';
import { ReportsInvestoresComponent } from '../reports-investores/reports-investores.component';
import { ReportsBorrowerComponent } from './reports-borrower/reports-borrower.component';
import { BorrowerModelNoteComponent } from './reports-borrower/borrower-model-note/borrower-model-note.component';




 
const ChildRoutes: Routes = [
    {
      path: 'inverstors-kyc',
      component:InvestorBorrowerKYCComponent
    },
    {
      path: 'borrowers-kyc',
      component:InvestorBorrowerKYCComponent
    },
    {
      path: 'Report-investoers',
      component : ReportsInvestoresComponent
    },
    {
      path: 'borrowers-reports',
      component:ReportsBorrowerComponent
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
    InvestorBorrowerKYCComponent,
    ReportsInvestoresComponent,
    ReportsBorrowerComponent,
    BorrowerModelNoteComponent
  ]
})
export class InvestorBorrowerKYCModule { }
