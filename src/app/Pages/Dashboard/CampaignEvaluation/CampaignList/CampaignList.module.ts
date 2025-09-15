import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoaderModule } from 'src/app/shared/loader/Loader.module';
import { CampaignList } from './CampaignList';
import { ProgramsDetailsComponent } from '../programs-details/programs-details.component';
import { AddProgramsComponent } from '../programs-details/add-programs/add-programs.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

import { ReactiveFormsModule } from '@angular/forms';
import { AddDirectorsComponent } from '../directors/add-directors/add-directors.component';


import { OpportunityModelNoteComponent } from './opportunity-model-note/opportunity-model-note.component'; 
import { OpportunityInvistorsComponent } from '../../KYC/opportunity-invistors/opportunity-invistors.component';
import { CommonModule } from '@angular/common';


const ChildRoutes: Routes = [
  {
    path: 'campaign-list',
    component: CampaignList
  },
  { path: 'program-details/:id', component: ProgramsDetailsComponent },
  { path: 'add-programs', component: AddProgramsComponent },
  {
    path : 'opportunity-note',
    component : OpportunityModelNoteComponent
  },
  {
    path:'opprtunity-invistor',
    component : OpportunityInvistorsComponent
  }
]

@NgModule({
  declarations: [
    CampaignList,
    ProgramsDetailsComponent,
    AddProgramsComponent,
    AddDirectorsComponent,
    OpportunityModelNoteComponent,
  
  ],
  imports: [
    RouterModule.forChild(ChildRoutes),
    FormsModule,
    NgbPaginationModule,
    ReactiveFormsModule,
    CommonModule,
    LoaderModule,
  ],

})
export class CampaignListModule { }
