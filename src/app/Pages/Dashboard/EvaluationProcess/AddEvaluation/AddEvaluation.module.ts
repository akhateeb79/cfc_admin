import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoaderModule } from 'src/app/shared/loader/Loader.module';
import { AddEvaluationComponent } from './AddEvaluation.component';




 
const ChildRoutes: Routes = [
    {
        path: 'add-evaluation',
        component:AddEvaluationComponent
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
    AddEvaluationComponent
  ]
})
export class AddEvaluationModule { }
