import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoaderModule } from 'src/app/shared/loader/Loader.module';
import { LoanListComponent } from './loan-list.component';



 
const ChildRoutes: Routes = [
    {
        path: 'list-loan',
        component:LoanListComponent
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
    LoanListComponent
  ]
})
export class LoanListModule { }
