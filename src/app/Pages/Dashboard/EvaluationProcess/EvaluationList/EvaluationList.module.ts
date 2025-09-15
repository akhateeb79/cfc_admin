import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EvaluationListComponent } from './EvaluationList.component';
import { LoaderModule } from 'src/app/shared/loader/Loader.module';




 
const ChildRoutes: Routes = [
    {
        path: 'evaluation-list',
        component:EvaluationListComponent
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
    EvaluationListComponent
  ]
})
export class EvaluationListModule { }
