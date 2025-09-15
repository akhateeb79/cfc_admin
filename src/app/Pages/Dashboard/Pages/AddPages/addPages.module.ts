import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoaderModule } from 'src/app/shared/loader/Loader.module';
import { AddPagesComponent } from './addPages';
// import { CKEditorModule } from '@ckeditor/ckeditor5-angular';






 
const ChildRoutes: Routes = [
    {
        path: 'add-pages',
        component:AddPagesComponent
      },
  ]

@NgModule({
  imports: [
    RouterModule.forChild(ChildRoutes),
    FormsModule,
    CommonModule,
    LoaderModule,
    ReactiveFormsModule,
    // CKEditorModule
  ],
  declarations:[
    AddPagesComponent
  ]
})
export class AddPagesModule { }
