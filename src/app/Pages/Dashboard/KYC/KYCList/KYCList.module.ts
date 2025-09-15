import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoaderModule } from 'src/app/shared/loader/Loader.module';
import { KYCListComponent } from './KYCList.component';




 
const ChildRoutes: Routes = [
    {
        path: 'list-kyc',
        component:KYCListComponent
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
    KYCListComponent
  ]
})
export class KYCListModule { }
