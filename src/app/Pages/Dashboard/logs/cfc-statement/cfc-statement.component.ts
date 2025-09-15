import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/shared/Services/user.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-cfc-statement',
  templateUrl: './cfc-statement.component.html',
  styleUrls: ['./cfc-statement.component.css']
})
export class CfcStatementComponent implements OnInit {
  account: string = '';
  startDate: string = '';
  endDate: string = '';
  loading: boolean = false;
  error: string = '';
  statement: any = null;
  message: string = '';
  TransactionType: any = '';
  toAccount: any = '';
  filteredData: any[] = [];
  EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  constructor(private usersService: UsersService) { }

  ngOnInit() {
  }
  searchStatement() {
    const searchTerm = this.toAccount.toLowerCase();
    if (this.toAccount !== '') {
      this.filteredData = this.filteredData.filter(stmt =>
        stmt.narr2.toLowerCase().includes(searchTerm)
      );
    }
    else {
      this.filteredData = this.filteredData;
    }


  }
  getStatement() {
    this.loading = true;
    this.error = '';
    this.statement = null;
    this.message = '';
    this.usersService.getStatment(this.account, this.startDate, this.endDate).subscribe(
      (data: any) => {
        this.loading = false;
        if (data.status === true) {
          this.statement = data.response;
          this.message = data.response.message;
          if (this.TransactionType !== '') {
            this.filteredData = this.statement.filter(record => record.partTrnType == this.TransactionType);
            if(this.TransactionType =='CREDIT'){
              this.searchStatement();
            }
          }
          else {
            this.filteredData = this.statement;
          }

        } else {
          this.error = data.response.message[0].message;
        }
      },
      (error) => {
        this.loading = false;
        this.error = 'An error occurred while fetching data.';
      }
    );
  }
  exportAccountRecordsToExcel() {
    if (this.filteredData && this.filteredData.length > 0) {
      // Prepare the data for Excel
      const accountRecords = this.filteredData.map(record => ({
        'ID': record.id,
        'Account Number': record.accountNumber,
        'From Date': record.fromDate,
        'To Date': record.toDate,
        'Number of Records': record.numberOfRecords,
        'Completed': record.completed,
        'Offset': record.offset,
        'Brought Forward Balance Amount': record["broughtFrwdBalance-amount"],
        'Brought Forward Balance Currency Code': record["broughtFrwdBalance-currencyCode"],
        'Opening Clear Balance Amount': record["openingClrBalance-amount"],
        'Page Open Balance Amount': record["pageOpenBalance-amount"],
        'Page Open Balance Currency Code': record["pageOpenBalance-currencyCode"],
        'Closing Balance Amount': record["closingBalance-amount"],
        'Closing Balance Currency Code': record["closingBalance-currencyCode"],
        'Unique ID': record.uniqueId,
        'Post Date': record.postDate,
        'Posting Time': record.postingTime,
        'Value Date': record.valueDate,
        'Type': record.type,
        'Amount': record.amount,
        'Currency Code': record.currencyCode,
        'Narrative 1': record.narr1,
        'Narrative 2': record.narr2,
        'Narrative 3': record.narr3,
        'Reference Number': record.refNum,
        'Counter': record.counter,
        'Statement': record.stmt,
        'Partial Transaction Type': record.partTrnType,
        'Partial Transaction Serial Number': record.partTrnSrlNum,
        'Running Balance Amount': record["runningBalance-amount"],
        'Running Balance Currency Code': record["runningBalance-currencyCode"],
        'Ordering Party': record.orderingParty,
        'SAMA Narrative': record.samaNarr,
        'Network': record.network,
        'Channel': record.channel,
        'Category': record.category,
        'Sub Category': record.subCategory,
        'Source Account Number': record.srcAcctNum,
        'POI Number': record.poiNum,
        'IBAN': record.iban,
        'Particulars Code': record.prtclrsCode,
        'Beneficiary Name': record.beneficiaryName,
        'Created At': record.created_at,
        'Updated At': record.updated_at
      }));
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(accountRecords);
      const workbook: XLSX.WorkBook = {
        Sheets: { 'Account Records': worksheet },
        SheetNames: ['Account Records']
      };
  
      // Create an Excel file and trigger a download
      const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, 'account_records');
    } else {
      console.error('Account record data is not available.');
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
