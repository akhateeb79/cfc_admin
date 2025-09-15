import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
// import { LoaderModule } from 'src/app/shared/loader/Loader.module';
import { Component4 } from './Component4';




 
const ChildRoutes: Routes = [
    {
        path: 'component4',
        component:Component4
      },
  ]

@NgModule({
  imports: [
    RouterModule.forChild(ChildRoutes),
    FormsModule,
    CommonModule,
    // LoaderModule
  ],
  declarations:[
    Component4
  ]
})
export class Component4Module { }
