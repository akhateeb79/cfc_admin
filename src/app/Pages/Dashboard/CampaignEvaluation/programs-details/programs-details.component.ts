import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { KYCService } from 'src/app/shared/Services/kyc.service';
import { environment } from 'src/environments/environment';
import { ConfirmDeleteModalComponent } from './confirm-delete-modal/confirm-delete-modal.component';
import { UpdateDetailsComponent } from './update-details/update-details.component';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Location } from '@angular/common';  // Import Location service

@Component({
  selector: 'app-programs-details',
  templateUrl: './programs-details.component.html',
  styleUrls: ['./programs-details.component.css']
})
export class ProgramsDetailsComponent implements OnInit {
  LANG = environment.english_translations;
  program: any[] = [];
  tableHeaders: string[] = [];
  isDisabled: boolean = false; // Enable/disable pagination
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;
  paginatedRecords: any[] = [];
  programId: number;
  directorToDeleteId!: number; // Store the ID of the director to delete
  // @ViewChild(RemoveDirectorsComponent, { static: false }) confirmDeleteModal!: RemoveDirectorsComponent;

  constructor(private route: ActivatedRoute, private location: Location, private kycService: KYCService, private toast: ToastrManager, private modalService: NgbModal, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.programId = +params.get('id'); // Get the 'id' from the route parameter
 
     
      this.fetchProgramData(this.programId); // Fetch program data and set pagination

    });
    this.currentPage = 1; // Ensure current page starts at 1

  }

  navigateToAddProgram(): void {
    this.router.navigate(['/dashboard/add-programs'], { queryParams: { id: this.programId } });
  }
  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.program.length / this.itemsPerPage);
  }
  goBack(): void {
    this.location.back();  // Navigate back to the previous page
  }
  toggleDisabled() {
    this.isDisabled = !this.isDisabled;
  }
 

  confirmDelete() {
    // Implement your deletion logic here
 
    // Call your service to delete the director here
  }
  // Update pagination details when the data or page changes
  updatePagination(): void {
    this.totalPages = Math.ceil(this.program.length / this.itemsPerPage); // Calculate total pages
    this.paginateRecords(); // Update paginated records
  }

  // Slice the program data to show only records for the current page
  paginateRecords(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.program.length); // Prevent exceeding array length
    this.paginatedRecords = this.program.slice(startIndex, endIndex);
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
  // fetchProgramData(id): void {
  //   this.kycService.getPrograms().subscribe((response) => {
  //     this.program = response.data;  // Assuming the response has a 'data' property
  //     console.log("this.program",response);
  //     this.calculateTotalPages();
  //     this.paginateRecords();

  //   });
  // }
  fetchProgramData(id): void {
    this.kycService.getProgramById(id).subscribe((response) => {
      this.program = response.response.response

      this.calculateTotalPages();
      this.paginateRecords();

    });
  }
  editProgram(id: number): void {

    const modalRef = this.modalService.open(UpdateDetailsComponent);
    modalRef.componentInstance.programId = this.programId;
    modalRef.componentInstance.id = id;

    modalRef.result.then(
      (result) => {

        if (result && result.message === 'Data update successfully') {
          this.fetchProgramData(this.programId);
          this.updatePagination();
        }
      },
      (reason) => {
        this.fetchProgramData(this.programId);
      }
    );
  }


  deleteProgram(id: number): void {
    const modalRef = this.modalService.open(ConfirmDeleteModalComponent);

    modalRef.result.then((result) => {
      if (result === 'confirm') {
        this.kycService.deleteProgram(id).subscribe({
          next: (response) => {
            this.toast.successToastr(this.LANG.Program_deleted_successfully);

            this.fetchProgramData(this.programId);

            this.updatePagination(); 
          },
          error: (error) => {
            this.toast.warningToastr(error.message);

            console.error('Error deleting program:', error);
          }
        });
      }
    }, (reason) => {
      console.error('Deletion canceled:',reason);
    });
  }
}
