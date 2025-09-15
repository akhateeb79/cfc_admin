import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './Dashboard';
import { TransSetupComponent } from './trans-setup/trans-setup.component';
import { ConfirmDeleteModalComponent } from './CampaignEvaluation/programs-details/confirm-delete-modal/confirm-delete-modal.component';
import { UpdateDetailsComponent } from './CampaignEvaluation/programs-details/update-details/update-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OpportunityInvistorsComponent } from './KYC/opportunity-invistors/opportunity-invistors.component';
import { ModelOpportunityComponent } from './KYC/opportunity-invistors/model-opportunity/model-opportunity.component';
import { EditUserComponent } from './user-management/edit-user/edit-user.component';
















const ChildRoutes: Routes = [
  {
    path: 'dashboard',
    component:DashboardComponent,
    children: [
      {
        path: '',
        loadChildren: './logs/logs.module#LogsModule',
      },
      {
        path: '',
        loadChildren: './transfer/transfer.module#TransferModule',
      },
      
      {
        path: '',
        loadChildren: './Tracking/tracking.module#TrackingModule',
      },
      {
          path: '',
          loadChildren: './Products/ProductAttributes/productAttributes.module#ProductAttributesModule'

      },   
      {
        path: '',
        loadChildren: './Products/AddProductAttributes/AddProductAttributes.module#AddProductAttributesModule'
      }, 
      {
        path: '',
        loadChildren: './Products/ProductList/productList.module#ProductListModule'
      },
      {
        path: '',
        loadChildren: './Products/UpdateProductList/update-product-list.module#UpdateProductListModule'
      },
      {
        path: '',
        loadChildren: './KYC/KYCList/KYCList.module#KYCListModule'
      },
      {
        path: '',
        loadChildren: './KYC/AddKYC/AddKYC.module#AddKYCModule'
      },

      {
        path: '',
        loadChildren: './KYC/UserRoles/UserRole.module#UserRoleModule',
      },
      {
        path: '',
        loadChildren: './KYC/InfoType/InfoTypeList/InfoType.module#InfoTypeModule',
      }, 
      {
        path: '',
        loadChildren: './KYC/userType/UserTypeList/UserType.module#UserTypeModule',
      }, 
      
      {
        path: '',
        loadChildren: './KYC/InfoType/AddInfoType/AddInfoType.module#AddInfoTypeModule',
      },
     
      {
        path: '',
        loadChildren: './KYC/userType/AddUserType/AddUserType.module#AddUserTypeModule',
      },
      {
        path: '',
        loadChildren: './EvaluationProcess/EvaluationList/EvaluationList.module#EvaluationListModule'
      },

      {
        path: '',
        loadChildren: './EvaluationProcess/AddEvaluation/AddEvaluation.module#AddEvaluationModule'
      },

      {
        path: '',
        loadChildren: './CampaignEvaluation/CampaignDetails/CampaignDetails.module#CampaignDetailsModule'
      },
      {
        path: '',
        loadChildren: './CampaignEvaluation/CampaignList/CampaignList.module#CampaignListModule'
      },
       {
        path: '',
        loadChildren: './CampaignEvaluation/InvestorList/InvestorList.module#InvestorListModule'
      },
      {
        path: '',
        loadChildren: './CampaignEvaluation/CampaignAttachment/CampaignAttachment.module#CampaignAttachmentModule'
      },
       {
        path: '',
        loadChildren: './CampaignEvaluation/campaign-data/campaign-data.module#CampaignDataModule'
      },
      {
        path: '',
        loadChildren: './CampaignEvaluation/Component3/Component3.module#Component3Module'
      },
      {
        path: '',
        loadChildren: './CampaignEvaluation/Component4/Component4.module#Component4Module'
      },

      {
        path: '',
        loadChildren: './KYC/InvestorBorrowerKYCList/investor-borrower-kyc.module#InvestorBorrowerKYCModule',
      },

      {
        path: '',
        loadChildren: './KYC/InvestorBorrowerKYCDetails/investor-borrower-kycdetails.module#InvestorBorrowerKYCDetailsModule',
      },
      {
        path: '',
        loadChildren: './KYC/invsetor-agreement/invsetor-agreement.module#InvsetorAgreementModule',
      },
      {
        path: '',
        loadChildren: './Products/LoanManagement/add-loan/add-loan.module#AddLoanModule',
      },

      {
        path: '',
        loadChildren: './Pages/pages.module#PagesModule',
      },
      {
        path: '',
        loadChildren: './Pages/AddPages/addPages.module#AddPagesModule',

      },
      {
        path: '',
        loadChildren: './Pages/PagesParameters/PagesParameters.module#PagesParametersModule',

      },

      {
        path: '',
        loadChildren: './user-management/AdminList/AdminList.module#AdminListModule',

      },
      {
        path: '',
        loadChildren: './user-management/edit-user/EditUser.module#EditUserModule',

      },
      {
        path: '',
        loadChildren: './user-management/AddAdmin/add-admin.module#AddAdminModule',
      },

      {
        path: '',
        loadChildren: './user-management/AdminIpList/admin-ip-list.module#AdminIpListModule',
      },
      // {
      //   path: '',
      //   loadChildren: './user-management/AdminIpList/director-list.module#AdminIpListModule',
      // },
      {
        path: '',
        loadChildren: './user-management/AddAdminIp/add-admin-ip.module#AddAdminIpModule',
      },

      {
        path: '',
        loadChildren: './user-management/AdminIpLogs/admin-ip-log.module#AdminIpLogsModule',
      },

      {
        path: '',
        loadChildren: './Notifications/Email/email-template-list/email-template-list.module#EmailTemplateListModule',
      },

      {
        path: '',
        loadChildren: './Notifications/Email/add-email-templates/add-email-templates.module#AddEmailTemplateModule',
      },

      {
        path: '',
        loadChildren: './Notifications/SMS/email-template-list/email-template-list.module#EmailTemplateListModule',
      },

      {
        path: '',
        loadChildren: './Notifications/SMS/add-email-templates/add-email-templates.module#AddEmailTemplateModule',
      },

      {
        path: '',
        loadChildren: './OpportunitySetup/opportunity-setup.module#OpportunitySetupModule',
      },
      {
        path: '',
        loadChildren: './Home/Sections/SectionList/sectionList.module#SectionListModule',
      },
      {
        path: '',
        loadChildren: './Home/Sections/AddSection/add-section.module#AddSectionModule',
      },
      {
        path: '',
        loadChildren: './trans-setup/trans-setup.module#TransSetupModule',
      },
      
    ],
  },
  ]
 
@NgModule({
  imports: [
    RouterModule.forChild(ChildRoutes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule, 
   
    NgbModule  
  ],
  declarations:[
      DashboardComponent,
      ConfirmDeleteModalComponent,
      UpdateDetailsComponent,
      OpportunityInvistorsComponent,
      ModelOpportunityComponent,
  ]
})
export class DashboardModule { }
