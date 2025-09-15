import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoaderModule } from 'src/app/shared/loader/Loader.module';
import { InvestorList } from './InvestorList';




 
const ChildRoutes: Routes = [
    {
        path: 'investor-list',
        component:InvestorList
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
    InvestorList
  ]
})
export class InvestorListModule { }
