import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoaderModule } from 'src/app/shared/loader/Loader.module';
import { InfoTypeComponent } from './InfoType.component';




 
const ChildRoutes: Routes = [
    {
        path: 'info-type',
        component:InfoTypeComponent
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
    InfoTypeComponent
  ]
})
export class InfoTypeModule { }
