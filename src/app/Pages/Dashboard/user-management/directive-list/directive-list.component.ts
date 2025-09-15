import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { KYCService } from 'src/app/shared/Services/kyc.service';
import { environment } from 'src/environments/environment';

import { ToastrManager } from 'ng6-toastr-notifications';
import { Location } from '@angular/common';  // Import Location service
import { DeleteDirectorComponent } from './delete-director/delete-director.component';
import { UpdateDirectorComponent } from './update-director/update-director.component';

@Component({
  selector: 'app-directive-list',
  templateUrl: './directive-list.component.html',
  styleUrls: ['./directive-list.component.css']
})
export class DirectiveListComponent implements OnInit {

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
      this.fetchProgramData(); // Fetch program data and set pagination

    });
    this.currentPage = 1; // Ensure current page starts at 1

  }

  navigateToAddProgram(): void {
    this.router.navigate(['/dashboard/director-Added'],);
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
  fetchProgramData(): void {
    this.kycService.getDirectors().subscribe((response) => {
      this.program = response

      this.calculateTotalPages();
      this.paginateRecords();

    });
  }
  editProgram(id: number): void {

    const modalRef = this.modalService.open(UpdateDirectorComponent);
    modalRef.componentInstance.programId = id;
    modalRef.componentInstance.id = id;

    modalRef.result.then(
      (result) => {

        if (result && result.message === 'Data updated successfully') {
          console.log('Program updated successfully, fetching updated data');
          this.fetchProgramData();
          this.updatePagination();
        }
      },
      (reason) => {
        console.error('Modal dismissed with reason:', reason);
        this.fetchProgramData();
      }
    );
  }


  deleteProgram(id: number): void {
    const modalRef = this.modalService.open(DeleteDirectorComponent);

    modalRef.result.then((result) => {
      if (result === 'confirm') {
        this.kycService.deletedirector(id).subscribe({
          next: (response) => {
            this.toast.successToastr(this.LANG.Program_deleted_successfully);

            this.fetchProgramData();

            this.updatePagination(); 
          },
          error: (error) => {
            this.toast.warningToastr(error.message);

            console.error('Error deleting program:', error);
          }
        });
      }
    }, (reason) => {
      console.error('Deletion canceled:', reason);
    });
  }
}
