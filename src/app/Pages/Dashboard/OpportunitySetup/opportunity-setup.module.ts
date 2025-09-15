import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoaderModule } from 'src/app/shared/loader/Loader.module';
import { OpportunitySetupComponent } from './opportunity-setup.component';




 
const ChildRoutes: Routes = [
    {
        path: 'opportunity-setup',
        component:OpportunitySetupComponent
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
    OpportunitySetupComponent
  ]
})
export class OpportunitySetupModule { }
   