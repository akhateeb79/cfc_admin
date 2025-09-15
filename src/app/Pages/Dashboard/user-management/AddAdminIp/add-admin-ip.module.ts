import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoaderModule } from 'src/app/shared/loader/Loader.module';
import { AddAdminIpComponent } from './add-admin-ip.component';




 
const ChildRoutes: Routes = [
    {
      path: 'add-admin-ip',
      component:AddAdminIpComponent 
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
    AddAdminIpComponent
  ]
})
export class AddAdminIpModule { }
