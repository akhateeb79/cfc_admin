import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoaderModule } from 'src/app/shared/loader/Loader.module';
import { UserTypeComponent } from './UserType.component';




 
const ChildRoutes: Routes = [
    {
        path: 'user-type',
        component:UserTypeComponent
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
    UserTypeComponent
  ]
})
export class UserTypeModule { }
