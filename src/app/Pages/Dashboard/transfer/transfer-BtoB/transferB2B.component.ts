import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { KYCService } from "src/app/shared/Services/kyc.service";

@Component({
  selector: "app-transfer-B2B",
  templateUrl: "./transferB2B.component.html",
  styleUrls: ["./transferB2B.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransferB2BComponent implements OnInit {
  showForm = false;
  showtable = true;
  itemId: number;
  permissions: string[] = [];
  showApprovalSection: boolean = false;
  errorMessage: string;
  userId: number;
  requestNumber: number;
  approvalLevelId: string;
  requestData: any;
  isInInitiatedSection: boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;
  paginatedRecords: any[] = [];
  private workflowDataSubscription: Subscription;
  constructor(private route: ActivatedRoute, private kycService: KYCService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    const storedUserId = localStorage.getItem('user-id');
    this.requestNumber = Date.now();

    if (storedUserId) {
      this.userId = +storedUserId;
    } else {
      console.error('User ID not found in localStorage');
      return;
    }

    this.route.params.subscribe(params => {
      this.itemId = +params['id'];
      this.getPermissionsAndWorkflowData();
    });
    this.workflowDataSubscription = this.kycService.workflowDataUpdated$.subscribe(() => {
      this.getWorkflowInstanceData();
    });



  }

  handleRequestDataChange(newData: any) {
    this.getWorkflowInstanceData();

  }
  getPermissionsAndWorkflowData() {
    this.permissions = [
      "initiated",
      "Approval",
      "preview",
      "2nd Reviewer",
      "Approval",
      "approval",
      "intiated",
      "initiated",
      "preview",
      "Approval",
      "refund intiater",
      "refund reviewer",
      "refund approver",
      "preview",
      "preview",
      "Approver",
      "Reviewer",
      "Reviewer",
      "Approver"
    ]


    this.showApprovalSection = this.permissions.includes('initiated');
    this.isInInitiatedSection = this.checkIfInInitiatedSection(); 

    this.showForm = this.isInInitiatedSection; 
    this.showtable = !this.isInInitiatedSection; 

    this.getWorkflowInstanceData();
  }

  checkIfInInitiatedSection(): boolean {
    return this.permissions.includes('initiated');
  }

  getWorkflowInstanceData(): void {
    if (!this.permissions || !Array.isArray(this.permissions)) {
      console.error('Permissions are undefined or not an array');
      return;
    }

    if (this.permissions.includes('Approval')) {
      this.approvalLevelId = "preview";
    } else if (this.permissions.includes('preview') || this.permissions.includes('initiated')) {
      this.approvalLevelId = "initiated";
    } else {
      this.approvalLevelId = "fixed";
      console.error('No matching permission found for approval level.');
    }

    this.kycService.getWorkflowInstance(this.itemId, this.userId, this.requestNumber, this.approvalLevelId).subscribe(
      (data) => {
        this.requestData = data; 

        this.cdr.detectChanges(); 


      },
      (error) => {
        console.error('Error fetching workflow data:', error);
      }
    );
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.requestData.length / this.itemsPerPage);
    this.paginateRecords(); 
  }

  paginateRecords(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.requestData.length);
    this.paginatedRecords = this.requestData.slice(startIndex, endIndex);
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
