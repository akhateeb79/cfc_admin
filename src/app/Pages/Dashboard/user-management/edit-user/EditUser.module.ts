import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoaderModule } from 'src/app/shared/loader/Loader.module';
import { EditUserComponent } from './edit-user.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';




 
const ChildRoutes: Routes = [
      {
        path: 'edit-user',
        component:EditUserComponent 
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
    EditUserComponent,
    UpdatePasswordComponent,
  ]
})
export class EditUserModule { }
