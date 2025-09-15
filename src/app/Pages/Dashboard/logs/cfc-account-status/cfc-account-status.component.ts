import { Component, OnInit } from "@angular/core";
import { UsersService } from "src/app/shared/Services/user.service";
import * as XLSX from 'xlsx';
@Component({
  selector: "app-cfc-account-status",
  templateUrl: "./cfc-account-status.component.html",
  styleUrls: ["./cfc-account-status.component.css"],
})
export class CfcAccountStatusComponent implements OnInit {
  constructor(private usersService: UsersService) {}
  debitAccount: string = "";
  loading: boolean = false;
  error: string = "";
  transactions: any = null;
  message: string = "";
  EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  ngOnInit() {}

  getStatement() {
    this.loading = true;
    this.error = "";
    this.transactions = null;
    this.message = "";
    this.usersService.getStatus(this.debitAccount).subscribe(
      (data: any) => {
        this.loading = false;
        if (data.status === true) {
          this.transactions = data.response;
          this.message = data.response.message;
        } else {
          this.error = data.response.message[0].message;
        }
      },
      (error) => {
        this.loading = false;
        this.error = "An error occurred while fetching data.";
      }
    );
  }
  exportTableToExcel() {
    if (this.transactions && this.transactions.length > 0) {
      // Prepare the data for Excel
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.transactions);
      const workbook: XLSX.WorkBook = {
        Sheets: { 'Transactions': worksheet },
        SheetNames: ['Transactions']
      };
  
      // Create an Excel file and trigger a download
      const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, 'transactions');
    } else {
      console.error('Transaction data is not available.');
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
