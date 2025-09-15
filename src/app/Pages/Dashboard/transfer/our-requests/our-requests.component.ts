import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { KYCService } from 'src/app/shared/Services/kyc.service';
import { environment } from 'src/environments/environment';
import { PreviewLevelWorkflowComponent } from './preview-level-workflow/preview-level-workflow.component';
import { ApprovalLevelWorkflowComponent } from './approval-level-workflow/approval-level-workflow.component';
import { DatePipe } from '@angular/common';
import { TrakingRequestComponent } from './traking-request/traking-request.component';
import { map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-our-requests',
  templateUrl: './our-requests.component.html',
  styleUrls: ['./our-requests.component.css']
})
export class OurRequestsComponent implements OnInit, OnChanges    {

  LANG = environment.english_translations;
  program: any[] = [];
  tableHeaders: string[] = [];
  isDisabled: boolean = false; // Enable/disable pagination
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;
  paginatedRecords: any[] = [];
  programId: number;
  userPermissions: string[] = [];
  private routeSubscription: Subscription;

  @Output() requestDataChange = new EventEmitter<any>();

  @Input() permissions: any;
  private routerSubscription: Subscription;

  @Input() requestData: any;
  displayAsTable: boolean = false;
  approvallevelpath:boolean =false
  displayAsTable5: boolean = false;
  @Input() itemId: any;
  constructor(private route: ActivatedRoute, private kycService: KYCService, private datePipe: DatePipe,private toast: ToastrManager,private cdr: ChangeDetectorRef, private modalService: NgbModal, private router: Router) {

    this.routeSubscription = this.route.url.pipe(
      map(segments => segments.map(segment => segment.path).join('/'))
    ).subscribe(currentPath => {
      switch (true) {
        case currentPath.includes('transfer-b2b/6'):
          this.displayAsTable = true;
          this.displayAsTable5 = false;
          break;
        case currentPath.includes('transfer-b2b/5'):
          this.displayAsTable = false;
          this.displayAsTable5 = true;
          break;
        default:
          this.displayAsTable = false;
          this.displayAsTable5 = false;
      }
    });
  }    
 
    
  ngOnInit(): void {
//       this.route.paramMap.subscribe(params => {
//       this.programId = +params.get('id'); // Get the 'id' from the route parameter
//       // this.fetchProgramData(this.programId); // Fetch program data and set pagination
// console.log("hiiiiiii",  this.programId)
//     });

    this.currentPage = 1; // Ensure current page starts at 1
 
    const storedPermissions = localStorage.getItem('userPermissions');
    
    if (storedPermissions) {
      try {
        this.userPermissions = JSON.parse(storedPermissions);
      } catch (error) {
        console.error('Failed to parse user permissions from localStorage:', error);
        this.userPermissions = []; // Fallback to an empty array if parsing fails
      }
    } else {
      console.warn('No user permissions found in localStorage.');
    }
    this.kycService.requestData$.subscribe(newData => {
      this.handleRequestDataChange(newData); 
      
    });
  }


  handleRequestDataChange(newData: any) {
    this.requestData = { ...newData }; // Assign new data to requestData
  }

  formatDate(date: string) {
    return this.datePipe.transform(date, 'yyyy-MM-dd HH:mm:ss');
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.requestData) {
      const newRequestData = changes.requestData.currentValue;

      if (newRequestData && Array.isArray(newRequestData.response)) {
        this.paginatedRecords = []; // Reset records for new data

        newRequestData.response.forEach(item => {
          let parsedRequest = {};
          
          if (this.isJSON(item.request)) {
            parsedRequest = JSON.parse(item.request);
          } else {
            console.warn('Invalid JSON format in request');
          }

          const fromAccount = parsedRequest['fromAccount'] || '';
          const toAccount = parsedRequest['toAccount'] || '';
          const amount = parsedRequest['amount'] || 0;
          const createdAt = parsedRequest['created_at'] || '';
          const updatedAt = parsedRequest['updated_at'] || 0;
          const formattedRecord = {
            id: item.id,
            userId: item.user_id,
            userName: item.user?.name || 'Unknown User',
            fromAccount,
            toAccount,
            amount,
            status: item.status || 'Unknown Status',
            createdAt: item.created_at,
            updatedAt: item.updated_at,
          };

          this.paginatedRecords.push(formattedRecord);
        });
      } else {
        console.warn('Invalid requestData structure', );
        this.paginatedRecords = []; // Fallback for invalid structure
      }
    }
  }
  getFilteredRecords(status: number) {
    if (!this.paginatedRecords || this.paginatedRecords.length === 0) {
      return [];
    }
  
    const filtered = this.paginatedRecords.filter((item) => {
      return item.status == status;
    });
    return filtered;
  }
  
  // Helper function to check if a string is valid JSON
  private isJSON(str: string): boolean {
    try {
      JSON.parse(str);
      return true;
    } catch {
      return false;
    }
  }

  
  
  
  // navigateToAddProgram(): void {
  //   this.router.navigate(['/dashboard/add-programs'], { queryParams: { id: this.programId } });
  // }
  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.requestData.length / this.itemsPerPage);
  }
  // goBack(): void {
  //   this.location.back();  // Navigate back to the previous page
  // }
  toggleDisabled() {
    this.isDisabled = !this.isDisabled;
  }

  // Update pagination details when the data or page changes
  updatePagination(): void {
    this.totalPages = Math.ceil(this.requestData.length / this.itemsPerPage); // Calculate total pages
    this.paginateRecords(); // Update paginated records
  }

  // Slice the program data to show only records for the current page
  paginateRecords(): void {
    // Check if this.requestData is an array before proceeding
    if (Array.isArray(this.requestData)) {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = Math.min(startIndex + this.itemsPerPage, this.requestData.length);
        this.paginatedRecords = this.requestData.slice(startIndex, endIndex);
    } else {
        console.error('requestData is not an array');
        this.paginatedRecords = []; // Reset to an empty array if not valid
    }
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
  // fetchProgramData(id): void {
  //   this.kycService.getProgramById(id).subscribe((response) => {
  //     this.program = response.data;  // Assuming the response has a 'data' property
  //     console.log("this.program", this.program);

  //     this.calculateTotalPages();
  //     this.paginateRecords();

  //   });
  // }
  // editProgram(id: number): void {
  //   console.log('Edit program with id:', id);

  //   const modalRef = this.modalService.open(UpdateDetailsComponent);
  //   modalRef.componentInstance.programId = this.programId;
  //   modalRef.componentInstance.id = id;

  //   modalRef.result.then(
  //     (result) => {
  //       console.log(result);

  //       if (result && result.message === 'Data update successfully') {
  //         console.log('Program updated successfully, fetching updated data');
  //         this.fetchProgramData(this.programId);
  //         this.updatePagination();
  //       }
  //     },
  //     (reason) => {
  //       console.log('Modal dismissed with reason:', reason);
  //       this.fetchProgramData(this.programId);
  //     }
  //   );
  // }
  Acceptance(id: number): void {
    const modalRef = this.modalService.open(PreviewLevelWorkflowComponent);
    modalRef.componentInstance.displayAsTable = this.displayAsTable;
    modalRef.componentInstance.displayAsTable5 = this.displayAsTable5;
  


    if (this.requestData && this.requestData.response) {

      const specificRequestData = this.requestData.response.find(item => item.id === id);
  
      modalRef.componentInstance.requestData = specificRequestData;
      modalRef.componentInstance.acceptedId = id;
  
      modalRef.result.then((result) => {
        if (result) {
          const itemIndex = this.requestData.response.findIndex(item => item.id === id);
  
          if (itemIndex > -1) {
            // Append the new response with updated status to the response array
            const updatedResponse = [
              ...this.requestData.response,
              { ...result.response, status: result.status }
            ];
            // Reassign requestData with a new object
            this.requestData = { ...this.requestData, response: updatedResponse };
          }
        }
  
        this.requestDataChange.emit(this.requestData);
      }).catch((reason) => {
        console.error('Modal dismissed with reason:');
      });
    }
  }
  
 

  approvallevel(id: number): void {
    const modalRef = this.modalService.open(ApprovalLevelWorkflowComponent);
    modalRef.componentInstance.displayAsTable = this.displayAsTable;

    modalRef.componentInstance.displayAsTable5 = this.displayAsTable5;

    if (this.requestData && this.requestData.response) {
      const specificRequestData = this.requestData.response.find(item => item.id === id);
  
      modalRef.componentInstance.requestData = specificRequestData; 
      modalRef.componentInstance.acceptedId = id; 
  
      modalRef.result.then((result) => {
        if (result) {
          const itemIndex = this.requestData.response.findIndex(item => item.id === id);
  
          if (itemIndex > -1) {
            const updatedResponse = [
              ...this.requestData.response,
              { ...result.response.response, status: result.status }
            ];
            this.requestData = { ...this.requestData, response: updatedResponse };
          }
        }
  
        this.requestDataChange.emit(this.requestData);
      }).catch((reason) => {
      
      });
    }
  }
  
  getProgressWidth(status: any): number {
    switch (status) {
      case '1': return 50;   // 50% for "Approved "
      case '0': return 100;    // 0% for "Rejected"
      case '2': return 30;  // 100% for "In Progress"
      case '3': return 100;   // 50% for "Approved "
      case '4': return 100;    // 0% for "Rejected"
      default: return -1;   // Fallback for unknown status
    }
  }
  ngOnDestroy(): void {
    // Unsubscribe from the route observable when the component is destroyed
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }
  getProgressText(status: any): string {
    switch (status) {
      case '2': return 'In Progress ';
      case '1': return 'Approved from Reviewer';
      case '0': return 'Rejected from Reviewer';
      case '3': return 'Approved from Apporver';
      case '4': return 'Rejected from Apporver';
      default: return 'status not appear';
    }
  }
  










  tracking(id: number): void {

    if (!this.requestData || !this.requestData.response || this.requestData.response.length === 0) {
       
        return;
    }

    const filteredData = this.requestData.response.filter((item: any) => item.id === id);

    if (filteredData.length > 0) {  
        const modalRef = this.modalService.open(TrakingRequestComponent);

        modalRef.componentInstance.work_flow_id = filteredData[0].work_flow_id;
        modalRef.componentInstance.request_number = filteredData[0].request_number;

        modalRef.result.then((result) => {
            if (result) {
              
            }
        }).catch((reason) => {
          
        });
    } else {
       
    }
}


}  
