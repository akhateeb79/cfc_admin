import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule} from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { LoaderModule } from 'src/app/shared/loader/Loader.module';
import { InvsetorAgreementComponent } from './invsetor-agreement.component';




 
const ChildRoutes: Routes = [
    {
        path: 'Invsetor-Agreement',
        component:InvsetorAgreementComponent
      },
  ]

@NgModule({
  imports: [
    RouterModule.forChild(ChildRoutes),
    FormsModule,
    CommonModule,
    LoaderModule,

  ],
  providers:[DatePipe],
  declarations:[
    InvsetorAgreementComponent
  ],
  exports: [InvsetorAgreementComponent] 
})
export class InvsetorAgreementModule { }
