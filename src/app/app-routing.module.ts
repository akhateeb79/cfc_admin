import { Routes } from '@angular/router';
import { noLoggedIn } from './shared/Services/NoLoggedIn.guard';

 
import { FullComponent } from './layouts/full/full.component';
import { authGuard } from './shared/Services/authGuard';
import { WorkflowResolverService } from './shared/Services/workflow-resolver.service';

export const Approutes: Routes = [
  {  
    path: '',
    component: FullComponent,
    resolve: { permissions: WorkflowResolverService },
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full'  },
      // {
      //   path: 'starter',
      //   loadChildren: './starter/starter.module#StarterModule'
      // },
      // {
      //   path: 'component',
      //   loadChildren: './component/component.module#ComponentsModule'
      // },
      {
        path: '',
        loadChildren: './Pages/Dashboard/Dashboard.module#DashboardModule'
      }, 
      
    ],
    canActivate:[authGuard]
  },
  {
    path: '',
    loadChildren:"./Pages/Login/login.module#LoginModule",
    // loadChildren: () => import('./Pages/login/login.module').then(m => m.LoginModule),
    canActivate:[noLoggedIn]
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];
