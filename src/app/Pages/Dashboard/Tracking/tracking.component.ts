import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KYCService } from 'src/app/shared/Services/kyc.service';
import { UsersService } from 'src/app/shared/Services/user.service';
import { environment } from 'src/environments/environment';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
@Component({
  selector: 'app-tracking',
  templateUrl: './Tracking.component.html',
  styleUrls: ['./Tracking.component.css']
})
export class TrackingComponent implements OnInit {
  LANG = environment.english_translations;
  data: any;
  allFieldTextArray = [];
  records: any; 
  selectedRecord: any; 
  isSelected: boolean = false;
  selectedRecordFields: { field: string, value: string }[] = [];
  filteredRecords: any[] = [];
  
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;
  paginatedRecords: any[] = [];
  adminName: any='';
  adminEmail: any='';

  constructor(private router: Router,private kyc:KYCService,private usersService:UsersService) {
    this.records = [];
    this.selectedRecord = null;
  }

  ngOnInit(): void {
  
    this.kyc.getTrack().subscribe((res:any)=>{
      if(res){
        this.records=res;
        this.records = this.records.map(res => ({
          id: res.id,
          UserID: res.UserID,
          UserName: res.UserName,
          ActionType: res.ActionType,
          LogDateTime: res.LogDateTime,
          created_at: res.created_at,
          log:res.log,
          isOpen: false
        }));
        this.filteredRecords = [...this.records];
        this.updatePagination();
      }
    })
  }
 
  async downloadPDF() {
    const data = document.getElementById('pdfContent');
    const downloadButton = document.getElementById('downloadPDFButton');
    if (data && downloadButton) {
      // Hide the button
      downloadButton.style.display = 'none';

      // Capture the content
      await html2canvas(data).then(canvas => {
        const imgWidth = 208;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        const contentDataURL = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const position = 0;
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
        pdf.save('record-detail.pdf');
      });

      // Show the button again
      downloadButton.style.display = 'block';
    }
  }
  
  downloadRecordCSV(records: { field: string; value: string }[]): void {
    const csvContent = this.convertRecordsToCSV(records);
    const blob = new Blob([csvContent], { type: 'text/csv' });

    const link = document.createElement('a');
    link.setAttribute('href', window.URL.createObjectURL(blob));
    link.setAttribute('download', 'records.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  convertRecordsToCSV(records: { field: string; value: string }[]): string {
    let csvContent = "Field,Value\n";
    records.forEach(record => {
      // Escape double quotes by doubling them
      const escapedField = record.field.replace(/"/g, '""');
      const escapedValue = record.value.replace(/"/g, '""');
      // Enclose field and value in double quotes
      csvContent += `"${escapedField}","${escapedValue}"\n`;
    });
    return csvContent;
  }
  
  
 
  
  
  filterByActions(filterText: string): void {
    this.filteredRecords = this.records.filter(record => {
      return record.actionType.toLowerCase().includes(filterText.toLowerCase());
    }).map(record => ({ ...record, isOpen: false }));
    this.updatePagination();
  }

  filterByTimeDate(filterText: string): void {
    this.filteredRecords = this.records.filter(record => {
      return record.logDateTime.toLowerCase().includes(filterText.toLowerCase());
    }).map(record => ({ ...record, isOpen: false }));
    this.updatePagination();
  }

  filterByPage(filterText: string): void {
    this.filteredRecords = this.records.filter(record => {
      return record.pageType.toLowerCase().includes(filterText.toLowerCase());
    }).map(record => ({ ...record, isOpen: false }));
    this.updatePagination();
  }



  

  toggleDetailView(record: any): void {
    this.usersService.getAdminDetails(record.UserID).subscribe((res:any)=>{
      this.adminName=res?.response?.name;
      this.adminEmail=res?.response?.email;
    })
    record.isOpen = !record.isOpen;
  }

  

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredRecords.length / this.itemsPerPage);
    this.paginateRecords();
  }

  paginateRecords(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedRecords = this.filteredRecords.slice(startIndex, endIndex);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateRecords();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginateRecords();
    }
  }
}
