import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CampaignDataComponent } from './campaign-data.component';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { LoaderModule } from 'src/app/shared/loader/Loader.module';

const ChildRoutes: Routes = [
  {
      path: 'campaign_data',
      component:CampaignDataComponent
    },
]

@NgModule({
  declarations: [
    CampaignDataComponent
  ],
  imports: [
    RouterModule.forChild(ChildRoutes),
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    LoaderModule
  ]
})
export class CampaignDataModule { }
