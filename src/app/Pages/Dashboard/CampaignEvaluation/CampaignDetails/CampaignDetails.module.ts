import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
// import { LoaderModule } from 'src/app/shared/loader/Loader.module';
import { CampaignDetails } from './CampaignDetails';
import { LoaderModule } from 'src/app/shared/loader/Loader.module';
import { AddLoanModule } from '../../Products/LoanManagement/add-loan/add-loan.module';




 
const ChildRoutes: Routes = [
    {
        path: 'campaign-details',
        component:CampaignDetails
      },
  ]

@NgModule({
  imports: [
    RouterModule.forChild(ChildRoutes),
    FormsModule,
    CommonModule,
    LoaderModule,
    AddLoanModule
    
  ],
  declarations:[
    CampaignDetails,
  ]
})
export class CampaignDetailsModule { }
