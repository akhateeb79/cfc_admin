import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoaderModule } from 'src/app/shared/loader/Loader.module';
import { ProductAttributesComponent } from './productAttributes.component';




 
const ChildRoutes: Routes = [
    {
        path: 'list-product-attribute',
        component:ProductAttributesComponent
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
    ProductAttributesComponent
  ]
})
export class ProductAttributesModule { }
