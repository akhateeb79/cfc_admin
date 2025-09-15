import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoaderModule } from 'src/app/shared/loader/Loader.module';
import { AddEmailTemplatesComponent } from './add-email-templates.component';




 
const ChildRoutes: Routes = [
    {
      path: 'add-email-templates',
      component:AddEmailTemplatesComponent 
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
    AddEmailTemplatesComponent
  ]
})
export class AddEmailTemplateModule { }
