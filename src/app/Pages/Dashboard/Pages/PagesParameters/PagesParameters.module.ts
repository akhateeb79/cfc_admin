import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoaderModule } from 'src/app/shared/loader/Loader.module';
import { PagesParametersComponent } from './PagesParameters';
// import { CKEditorModule } from '@ckeditor/ckeditor5-angular';






 
const ChildRoutes: Routes = [
    {
        path: 'page-parameters',
        component:PagesParametersComponent
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
    PagesParametersComponent
  ]
})
export class PagesParametersModule { }
