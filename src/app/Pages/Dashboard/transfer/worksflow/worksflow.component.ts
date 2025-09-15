import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { KYCService } from 'src/app/shared/Services/kyc.service';
import { environment } from 'src/environments/environment';
import { AddWorkflowComponent } from './add-workflow/add-workflow.component';

@Component({
  selector: 'app-worksflow',
  templateUrl: './worksflow.component.html',
  styleUrls: ['./worksflow.component.css']
})
export class WorksflowComponent implements OnInit {

  LANG = environment.english_translations;
  workflow: any[] = [];
  tableHeaders: string[] = [];
  isDisabled: boolean = false; // Enable/disable pagination
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;
  paginatedRecords: any[] = [];

  accountStatements: any = [
    {
      id: 1,
   name:"Bank accounts statements"
    },
    {
     id: 2,
   name:"CFC accounts statements"
    },
   
  ];
  constructor(private route: ActivatedRoute, private kycService: KYCService, private toast: ToastrManager, private modalService: NgbModal, private router: Router) { }

  ngOnInit(): void {
// this.fetchWorkFlow();
    this.currentPage = 1; // Ensure current page starts at 1

  }
  navigateToTransferB2B(itemId: number) {
    this.router.navigate(['/dashboard/transfer-b2b', itemId]);
  }
  navigateToAddworkflow(): void {
    this.router.navigate(['/dashboard/add-workflows'],
      //  { queryParams: { id: this.accountStatementsId } }
      
      );
  }
  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.accountStatements.length / this.itemsPerPage);
  }
  // goBack(): void {
  //   this.location.back();  // Navigate back to the previous page
  // }
  toggleDisabled() {
    this.isDisabled = !this.isDisabled;
  }

  // Update pagination details when the data or page changes
  updatePagination(): void {
    this.totalPages = Math.ceil(this.accountStatements.length / this.itemsPerPage); // Calculate total pages
    this.paginateRecords(); // Update paginated records
  }

  // Slice the workflow data to show only records for the current page
  paginateRecords(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.accountStatements.length); // Prevent exceeding array length
    this.paginatedRecords = this.accountStatements.slice(startIndex, endIndex);
  }

  openModal() {
    const modalRef = this.modalService.open(AddWorkflowComponent);
    
    modalRef.result.then((result) => {
      // this.fetchWorkFlow();
      // Handle the result if needed
    }, (reason) => {
      console.error('Modal dismissed with reason:', reason);
    });

    
  }
  // Navigate to the previous page
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateRecords();
    }
  }

  // Navigate to the next page
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginateRecords();
    }
  }
  // fetchWorkFlow(id): void {
  //   this.kycService.getworkflows().subscribe((response) => {
  //     this.accountStatements = response.data;  // Assuming the response has a 'data' property
  //     console.log("this.accountStatements",response);
  //     this.calculateTotalPages();
  //     this.paginateRecords();

  //   });
  // }
  // fetchWorkFlow(): void {
  //   this.kycService.getworkflows().subscribe((response) => {
  //     this.accountStatements = response.response;  
  //     console.log("this.accountStatements", this.accountStatements);

  //     this.calculateTotalPages();
  //     this.paginateRecords();

  //   });
  // }
  // editworkflow(id: number): void {
  //   console.log('Edit workflow with id:', id);

  //   const modalRef = this.modalService.open(UpdateDetailsComponent);
  //   modalRef.componentInstance.workflowId = this.accountStatementsId;
  //   modalRef.componentInstance.id = id;

  //   modalRef.result.then(
  //     (result) => {
  //       console.log(result);

  //       if (result && result.message === 'Data update successfully') {
  //         console.log('workflow updated successfully, fetching updated data');
  //         this.fetchWorkFlow(this.accountStatementsId);
  //         this.updatePagination();
  //       }
  //     },
  //     (reason) => {
  //       console.log('Modal dismissed with reason:', reason);
  //       this.fetchWorkFlow(this.accountStatementsId);
  //     }
  //   );
  // }


  // deleteworkflow(id: number): void {
  //   const modalRef = this.modalService.open(ConfirmDeleteModalComponent);

  //   modalRef.result.then((result) => {
  //     if (result === 'confirm') {
  //       this.kycService.deleteworkflow(id).subscribe({
  //         next: (response) => {
  //           console.log('workflow deleted successfully:', response);
  //           this.toast.successToastr(this.LANG.workflow_deleted_successfully);

  //           this.fetchWorkFlow(this.accountStatementsId);

  //           this.updatePagination(); 
  //         },
  //         error: (error) => {
  //           this.toast.warningToastr(error.message);

  //           console.error('Error deleting workflow:', error);
  //         }
  //       });
  //     }
  //   }, (reason) => {
  //     console.log('Deletion canceled:', reason);
  //   });
  // }
}
