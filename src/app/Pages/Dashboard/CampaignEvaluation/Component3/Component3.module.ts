import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
// import { LoaderModule } from 'src/app/shared/loader/Loader.module';
import { Component3 } from './Component3';




 
const ChildRoutes: Routes = [
    {
        path: 'component3',
        component:Component3
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
    Component3
  ]
})
export class Component3Module { }
