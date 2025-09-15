import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoaderModule } from 'src/app/shared/loader/Loader.module';
import { LogsComponent } from './logs.component';
import { BalancesComponent } from './balances/balances.component';
import { CfcStatementComponent } from './cfc-statement/cfc-statement.component';
import { CfcAccountStatusComponent } from './cfc-account-status/cfc-account-status.component';




 
const ChildRoutes: Routes = [
    {
        path: 'logs',
        component:LogsComponent
      },
      {
        path: 'balances',
        component:BalancesComponent
      },
      {
        path: 'CFClogs',
        component:CfcStatementComponent
      },
      {
        path: 'CFCStatus',
        component:CfcAccountStatusComponent
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
    LogsComponent,
    BalancesComponent,
    CfcStatementComponent,
    CfcAccountStatusComponent,
  ]
})
export class LogsModule { } 
