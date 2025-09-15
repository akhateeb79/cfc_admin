import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoaderModule } from 'src/app/shared/loader/Loader.module';
import { SectionsComponent } from './sectionList.component';




 
const ChildRoutes: Routes = [
    {
        path: 'section-list',
        component:SectionsComponent
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
    SectionsComponent
  ]
})
export class SectionListModule { }
