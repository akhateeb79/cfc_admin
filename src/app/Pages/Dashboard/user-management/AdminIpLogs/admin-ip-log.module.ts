import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoaderModule } from 'src/app/shared/loader/Loader.module';
import { AdminIpLogComponent } from './admin-ip-log.component';




 
const ChildRoutes: Routes = [
    {
      path: 'admin-ip-logs',
      component:AdminIpLogComponent 
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
    AdminIpLogComponent
  ]
})
export class AdminIpLogsModule { }
