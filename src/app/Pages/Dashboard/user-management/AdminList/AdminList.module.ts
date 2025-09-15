import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoaderModule } from 'src/app/shared/loader/Loader.module';
import { AdminListComponent } from './AdminList.component';




 
const ChildRoutes: Routes = [
    {
      path: 'users-list',
      component:AdminListComponent 
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
    AdminListComponent,
  

  ]
})
export class AdminListModule { }
