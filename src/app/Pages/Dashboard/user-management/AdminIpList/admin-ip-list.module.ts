import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoaderModule } from 'src/app/shared/loader/Loader.module';
import { AdminIpListComponent } from './admin-ip-list.component';
import { DirectiveListComponent } from '../directive-list/directive-list.component';
import { DeleteDirectorComponent } from '../directive-list/delete-director/delete-director.component';
import { UpdateDirectorComponent } from '../directive-list/update-director/update-director.component';
import { AddDirectorComponent } from '../directive-list/add-director/add-director.component';




 
const ChildRoutes: Routes = [
    {
      path: 'admin-ip-list',
      component:AdminIpListComponent 
    },

    {
      path: 'director-list',
      component:DirectiveListComponent 
    },
    {
      path: 'director-Added',
      component:AddDirectorComponent 
    },
  ]

@NgModule({
  imports: [
    RouterModule.forChild(ChildRoutes),
    FormsModule,
    CommonModule,
    LoaderModule,
    ReactiveFormsModule
  ],
  declarations:[
    AdminIpListComponent,
    DirectiveListComponent,
    DeleteDirectorComponent,
    UpdateDirectorComponent,
    AddDirectorComponent,

  ]
})
export class AdminIpListModule { }
