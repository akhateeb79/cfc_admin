import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoaderModule } from 'src/app/shared/loader/Loader.module';
import { UpdateProductListComponent } from './update-product-list.component';




 
const ChildRoutes: Routes = [
    {
        path: 'add-products',
        component:UpdateProductListComponent
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
    UpdateProductListComponent
  ]
})
export class UpdateProductListModule { }
