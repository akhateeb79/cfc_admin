import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { KYCService } from 'src/app/shared/Services/kyc.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-transfer-bto-c',
  templateUrl: './transfer-bto-c.component.html',
  styleUrls: ['./transfer-bto-c.component.css']
})
export class TransferBtoCComponent implements OnInit {
  LANG = environment.english_translations;
  workflow: any[] = [];
  tableHeaders: string[] = [];
  isDisabled: boolean = false; // Enable/disable pagination
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;
  paginatedRecords: any[] = [];


  constructor(private route: ActivatedRoute, private kycService: KYCService, private toast: ToastrManager, private modalService: NgbModal, private router: Router) { }

  ngOnInit(): void {
this.fetchWorkFlow();
    this.currentPage = 1; // Ensure current page starts at 1

  }
  navigateToTransferB2B(itemId: number) {
    this.router.navigate(['/dashboard/transfer-b2b', itemId]);
  }
  navigateToAddworkflow(): void {
    this.router.navigate(['/dashboard/add-workflows'],
      //  { queryParams: { id: this.workflowId } }
      
      );
  }
  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.workflow.length / this.itemsPerPage);
  }
  // goBack(): void {
  //   this.location.back();  // Navigate back to the previous page
  // }
  toggleDisabled() {
    this.isDisabled = !this.isDisabled;
  }

  // Update pagination details when the data or page changes
  updatePagination(): void {
    this.totalPages = Math.ceil(this.workflow.length / this.itemsPerPage); // Calculate total pages
    this.paginateRecords(); // Update paginated records
  }

  // Slice the workflow data to show only records for the current page
  paginateRecords(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.workflow.length); // Prevent exceeding array length
    this.paginatedRecords = this.workflow.slice(startIndex, endIndex);
  }

  // openModal() {
  //   const modalRef = this.modalService.open(AddWorkflowComponent);
    
  //   modalRef.result.then((result) => {
  //     console.log('Modal closed with result:', result);
  //     this.fetchWorkFlow();
  //     // Handle the result if needed
  //   }, (reason) => {
  //     console.log('Modal dismissed with reason:', reason);
  //   });

    
  // }
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
  //     this.workflow = response.data;  // Assuming the response has a 'data' property
  //     console.log("this.workflow",response);
  //     this.calculateTotalPages();
  //     this.paginateRecords();

  //   });
  // }
  fetchWorkFlow(): void {
    this.kycService.getworkflows().subscribe((response) => {
      this.workflow = response.response;  

      this.calculateTotalPages();
      this.paginateRecords();

    });
  }
  // editworkflow(id: number): void {
  //   console.log('Edit workflow with id:', id);

  //   const modalRef = this.modalService.open(UpdateDetailsComponent);
  //   modalRef.componentInstance.workflowId = this.workflowId;
  //   modalRef.componentInstance.id = id;

  //   modalRef.result.then(
  //     (result) => {
  //       console.log(result);

  //       if (result && result.message === 'Data update successfully') {
  //         console.log('workflow updated successfully, fetching updated data');
  //         this.fetchWorkFlow(this.workflowId);
  //         this.updatePagination();
  //       }
  //     },
  //     (reason) => {
  //       console.log('Modal dismissed with reason:', reason);
  //       this.fetchWorkFlow(this.workflowId);
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

  //           this.fetchWorkFlow(this.workflowId);

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
