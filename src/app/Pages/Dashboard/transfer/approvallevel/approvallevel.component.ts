import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { KYCService } from 'src/app/shared/Services/kyc.service';
import { environment } from 'src/environments/environment';
import { AddapprovallevelComponent } from './addapprovallevel/addapprovallevel.component';

@Component({
  selector: 'app-approvallevel',
  templateUrl: './approvallevel.component.html',
  styleUrls: ['./approvallevel.component.css']
})
export class ApprovallevelComponent implements OnInit {

  LANG = environment.english_translations;
  workflow: any[] = [];
  tableHeaders: string[] = [];
  isDisabled: boolean = false; 
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;
  paginatedRecords: any[] = [];
  userid: any;

  constructor(
    private route: ActivatedRoute,
    private kycService: KYCService,
    private toast: ToastrManager,
    private modalService: NgbModal,
    private router: Router
  ) {
    this.userid = localStorage.getItem('user-id');
  }

  ngOnInit(): void {
    this.fetchWorkFlow(this.userid);
  }

  fetchWorkFlow(id: any): void {
    this.kycService.getapprovallevel(id).subscribe((response) => {
      this.workflow = response.response.data || [];
      this.updatePagination();
    });
  }

  updatePagination(): void {
    this.calculateTotalPages();
    this.paginateRecords();
  }

  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.workflow.length / this.itemsPerPage);
  }

  paginateRecords(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.workflow.length);
    this.paginatedRecords = this.workflow.slice(startIndex, endIndex);
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

  navigateToAddworkflow(): void {
    this.router.navigate(['/dashboard/add-workflows']);
  }

  openModal(): void {
    const modalRef = this.modalService.open(AddapprovallevelComponent);
    modalRef.result.then(
      (result) => {
        if (result && result.message === 'Workflow_added_successfully') {
          this.fetchWorkFlow(this.userid);
        }
      },
      (reason) => {
        console.error('Modal dismissed with reason:', reason);
      }
    );
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
