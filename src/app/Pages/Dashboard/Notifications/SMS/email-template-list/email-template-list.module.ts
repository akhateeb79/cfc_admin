import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoaderModule } from 'src/app/shared/loader/Loader.module';
import { EmailTemplateListComponent } from './email-template-list.component';




 
const ChildRoutes: Routes = [
    {
      path: 'sms-templates-list',
      component:EmailTemplateListComponent 
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
    EmailTemplateListComponent
  ]
})
export class EmailTemplateListModule { }
