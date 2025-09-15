import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsersService } from 'src/app/shared/Services/user.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-balances',
  templateUrl: './balances.component.html',
  styleUrls: ['./balances.component.css']
})
export class BalancesComponent implements OnInit {

  accountNumber: string = '';
  loading: boolean = false;
  error: string = '';
  balance: any = null;
 EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  constructor(private http: HttpClient,private usersService:UsersService) {}

  getBalance() {
    this.loading = true;
    this.error = '';
    this.balance = null;
this.usersService.balances(this.accountNumber).subscribe(
  (data) => {
    this.loading = false;
    this.balance = data;
  },
  (error) => {
    this.loading = false;
    this.error = 'An error occurred while fetching data.';
  }
)
  }
  ngOnInit() {
  }
  exportToExcel() {
    if (this.balance) {
      // Prepare the data for Excel
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet([this.balance]);
      const workbook: XLSX.WorkBook = {
        Sheets: { 'Balance Data': worksheet },
        SheetNames: ['Balance Data']
      };
      
      // Create an Excel file and trigger a download
      const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, 'balance_data');
    } else {
      console.error('Balance data is not available.');
    }
  }
  
saveAsExcelFile(buffer: any, fileName: string): void {
  const data: Blob = new Blob([buffer], { type: this.EXCEL_TYPE });
  const link = document.createElement('a');
  const url = URL.createObjectURL(data);
  link.href = url;
  link.download = `${fileName}.xlsx`;
  link.click();
  URL.revokeObjectURL(url);
}
}
