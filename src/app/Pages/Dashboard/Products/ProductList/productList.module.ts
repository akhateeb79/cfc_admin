import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
// import { LoaderModule } from 'src/app/shared/loader/Loader.module';
import { ProductListComponent } from './productList.component';
import { LimitWordsPipe } from "./limit-words.pipe";




 
const ChildRoutes: Routes = [
    {
        path: 'product-list',
        component:ProductListComponent
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
    ProductListComponent,
    LimitWordsPipe
  ]
})
export class ProductListModule { }
