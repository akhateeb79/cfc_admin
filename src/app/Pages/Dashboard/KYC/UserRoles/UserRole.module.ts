import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoaderModule } from 'src/app/shared/loader/Loader.module';
import { UserRoleComponent } from './UserRole.component';




 
const ChildRoutes: Routes = [
    {
        path: 'user-role',
        component:UserRoleComponent
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
    UserRoleComponent
  ]
})
export class UserRoleModule { }
