import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UsersService } from "src/app/shared/Services/user.service";
import * as XLSX from "xlsx";
@Component({
  selector: "app-logs",
  templateUrl: "./logs.component.html",
  styleUrls: ["./logs.component.css"],
})
export class LogsComponent implements OnInit {
  account: string = "";
  startDate: string = "";
  endDate: string = "";
  loading: boolean = false;
  error: string = "";
  statement: any = null;
  message: string = "";
  toAccount: any = "";
  TransactionType: any = "";
  filteredData: any[] = [];
  EXCEL_TYPE =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  constructor(private http: HttpClient, private usersService: UsersService) {}

  ngOnInit() {}
  searchStatement() {
    const searchTerm = this.toAccount.toLowerCase();
    if (this.toAccount !== "") {
      this.filteredData = this.filteredData.filter((stmt) =>
        stmt.narr2.toLowerCase().includes(searchTerm)
      );
    } else {
      this.filteredData = this.filteredData;
    }
  }
  exportDetailedTableToExcel() {
    if (
      this.statement?.statement?.transactions &&
      this.statement.statement.transactions.length > 0
    ) {
      // Prepare the data for Excel
      const transactions = this.statement.statement.transactions.map(
        (transaction) => ({
          "Post Date": transaction?.postDate,
          "Posting Time": transaction?.postingTime,
          "Value Date": transaction?.valueDate,
          Type: transaction?.type,
          Amount: `${transaction?.amount?.amount} ${transaction?.amount?.currencyCode}`,
          Narrative: `${transaction?.narrative?.narr1} ${transaction?.narrative?.narr2} ${transaction?.narrative?.narr3}`,
          "Reference Number": transaction?.refNum,
          Counter: transaction?.counter,
          STMT: transaction?.stmt,
          "Transaction Type": transaction?.partTrnType,
          "Running Balance": `${transaction?.runningBalance?.amount} ${transaction?.runningBalance?.currencyCode}`,
          "SAMA Narrative": transaction?.samaNarr,
          Network: transaction?.network,
          "Particulars Code": transaction?.prtclrsCode,
        })
      );
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(transactions);
      const workbook: XLSX.WorkBook = {
        Sheets: { "Transaction Statements": worksheet },
        SheetNames: ["Transaction Statements"],
      };

      // Create an Excel file and trigger a download
      const excelBuffer: any = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      this.saveAsExcelFile(excelBuffer, "transaction_statements");
    } else {
      console.error("Transaction statement data is not available.");
    }
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: this.EXCEL_TYPE });
    const link = document.createElement("a");
    const url = URL.createObjectURL(data);
    link.href = url;
    link.download = `${fileName}.xlsx`;
    link.click();
    URL.revokeObjectURL(url);
  }
  getStatement() {
    this.loading = true;
    this.error = "";
    this.statement = null;
    this.message = "";
    this.usersService
      .accounts(this.account, this.startDate, this.endDate)
      .subscribe(
        (data: any) => {
          this.loading = false;
          if (data.status === "success") {
            this.statement = data.response;
            if (this.TransactionType !== "") {
              this.filteredData = this.statement.filter(
                (record) => record.partTrnType == this.TransactionType
              );
              if (this.TransactionType == "CREDIT") {
                this.searchStatement();
              }
            } else {
              this.filteredData = this.statement;
            }
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
}
