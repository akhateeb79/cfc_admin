import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { LoaderModule } from 'src/app/shared/loader/Loader.module';
import { TransferB2BComponent } from './transfer-BtoB/transferB2B.component';
import { RequestFormComponent } from './request-form/request-form.component';
import { OurRequestsComponent } from './our-requests/our-requests.component';

import { WorksflowComponent } from './worksflow/worksflow.component';
import { AddWorkflowComponent } from './worksflow/add-workflow/add-workflow.component';
import { BrowserModule } from '@angular/platform-browser';
import { ApprovallevelComponent } from './approvallevel/approvallevel.component';
import { AddapprovallevelComponent } from './approvallevel/addapprovallevel/addapprovallevel.component';

import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { RequestFormb2cComponent } from './request-formb2c/request-formb2c.component';
import { WorkflowResolverService } from 'src/app/shared/Services/workflow-resolver.service';
import { TransferBtoCComponent } from './transfer-bto-c/transfer-bto-c.component';
import { PreviewLevelWorkflowComponent } from './our-requests/preview-level-workflow/preview-level-workflow.component';
import { ApprovalLevelWorkflowComponent } from './our-requests/approval-level-workflow/approval-level-workflow.component';
import { TrakingRequestComponent } from './our-requests/traking-request/traking-request.component';
import { AppRequestFormb2PrtnerComponent } from './app-request-formb2-prtner/app-request-formb2-prtner.component';
import { RefundIncompleteOpportunityComponent } from './refund-incomplete-opportunity/refund-incomplete-opportunity.component';
import { FundProcessingComponent } from './fund-processing/fund-processing.component';
import { PayComponent } from './pay/pay.component';



 
const ChildRoutes: Routes = [
  { path: 'transfer-b2b/:id', component: TransferB2BComponent, resolve: { permissions: WorkflowResolverService } ,  },
  
      {
        path: 'Works-flow',
        component:WorksflowComponent,
       
      },
      {
        path: 'AddWorkflowComponent',
        component:AddWorkflowComponent
      },
      {
        path: 'Approva-llevel',
        component:ApprovallevelComponent
      },
  ]

@NgModule({
  imports: [
  
    RouterModule.forChild(ChildRoutes),
    FormsModule,
    CommonModule,
    LoaderModule,
    NgbTooltipModule,
  
    ReactiveFormsModule,
  
  ],
  declarations:[
    TransferB2BComponent,
 
    RequestFormComponent,
    OurRequestsComponent,
   
    WorksflowComponent,
    AddWorkflowComponent,
    ApprovallevelComponent,
    AddapprovallevelComponent,
    RequestFormb2cComponent,
    TransferBtoCComponent,
    PreviewLevelWorkflowComponent,
    ApprovalLevelWorkflowComponent,
    TrakingRequestComponent,
    AppRequestFormb2PrtnerComponent,
    RefundIncompleteOpportunityComponent,
    FundProcessingComponent,
    PayComponent
  ],
  providers: [DatePipe], 
})
export class TransferModule { } 
