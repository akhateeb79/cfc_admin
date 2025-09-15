import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoaderModule } from 'src/app/shared/loader/Loader.module';
import { TransSetupComponent } from './trans-setup.component';
import { FeesMatrixComponent } from './fees-matrix/fees-matrix.component';
import { FeesMatrixModule } from './fees-matrix/fees-matrix.module';




 
const ChildRoutes: Routes = [

  {
    path: 'fees-matrix',
    loadChildren: './fees-matrix/fees-matrix.module#FeesMatrixModule',
  },
  ]

@NgModule({
  imports: [
    RouterModule.forChild(ChildRoutes),
    FormsModule,
    CommonModule,
    LoaderModule,
  ],
  declarations:[
    TransSetupComponent,
  ]
})
export class TransSetupModule { } 
