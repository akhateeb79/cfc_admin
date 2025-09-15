import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoaderModule } from 'src/app/shared/loader/Loader.module';
import { TrackingComponent } from './Tracking.component';




 
const ChildRoutes: Routes = [
    {
        path: 'tracking',
        component:TrackingComponent
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
    TrackingComponent
  ]
})
export class TrackingModule { }
