import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoaderModule } from 'src/app/shared/loader/Loader.module';
import { AddInfoTypeComponent } from './AddInfoType';




 
const ChildRoutes: Routes = [
    {
        path: 'add-info-type',
        component:AddInfoTypeComponent
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
    AddInfoTypeComponent
  ]
})
export class AddInfoTypeModule { } 
