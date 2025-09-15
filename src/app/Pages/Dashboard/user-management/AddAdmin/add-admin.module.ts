import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoaderModule } from 'src/app/shared/loader/Loader.module';
import { AddAdminComponent } from './add-admin.component';




 
const ChildRoutes: Routes = [
    {
      path: 'add-admin',
      component:AddAdminComponent 
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
    AddAdminComponent
  ]
})
export class AddAdminModule { }
