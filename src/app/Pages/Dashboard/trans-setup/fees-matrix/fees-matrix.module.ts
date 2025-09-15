import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoaderModule } from 'src/app/shared/loader/Loader.module';
import { FeesMatrixComponent } from './fees-matrix.component';
import { CashInComponent } from './cash-in/cash-in.component';
import { CashOutComponent } from './cash-out/cash-out.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




 
const ChildRoutes: Routes = [
  { path: 'cash-in', component: CashInComponent },
  { path: 'cash-out', component: CashOutComponent }
     
  ]

@NgModule({
  imports: [
    RouterModule.forChild(ChildRoutes),
    FormsModule,
    CommonModule,
    LoaderModule,
    ReactiveFormsModule,
  ],
  declarations:[
    FeesMatrixComponent,
    CashInComponent,
    CashOutComponent
  ]
})
export class FeesMatrixModule { } 
