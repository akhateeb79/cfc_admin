import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoaderModule } from 'src/app/shared/loader/Loader.module';
import { AddProductAttributesComponent } from './AddProductAttributes.component';




 
const ChildRoutes: Routes = [
    {
        path: 'add-product-attribute',
        component:AddProductAttributesComponent
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
    AddProductAttributesComponent
  ]
})
export class AddProductAttributesModule { }
