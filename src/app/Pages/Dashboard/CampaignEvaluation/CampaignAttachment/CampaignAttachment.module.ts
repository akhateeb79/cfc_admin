import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoaderModule } from 'src/app/shared/loader/Loader.module';
import { CampaignAttachment } from './CampaignAttachment';




 
const ChildRoutes: Routes = [
    {
        path: 'campaign-attachment',
        component:CampaignAttachment
      },
  ] 

@NgModule({
  imports: [
    RouterModule.forChild(ChildRoutes),
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    LoaderModule
  ], 
  declarations:[
    CampaignAttachment
  ]
})
export class CampaignAttachmentModule { }
