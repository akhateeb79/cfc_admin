import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoaderModule } from 'src/app/shared/loader/Loader.module';
import { AddUserTypeComponent } from './AddUserType';




 
const ChildRoutes: Routes = [
    {
        path: 'add-user-type',
        component:AddUserTypeComponent
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
    AddUserTypeComponent
  ]
})
export class AddUserTypeModule { } 
