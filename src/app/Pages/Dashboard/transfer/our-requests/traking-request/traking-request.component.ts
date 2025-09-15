import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { KYCService } from 'src/app/shared/Services/kyc.service';

@Component({
  selector: 'app-traking-request',
  templateUrl: './traking-request.component.html',
  styleUrls: ['./traking-request.component.css']
})
export class TrakingRequestComponent implements OnInit {
  @Input() request_number!: number;
  @Input() work_flow_id!: number;
  username: any;
  email: any;
  updatedAt: any;
  userData: any[];
  initiatorData: any[];
  previewData: any[];
  constructor(public activeModal: NgbActiveModal, private kycService: KYCService, ) { }

  ngOnInit() {
    this.trackRequest(this.work_flow_id,this.request_number)

  }
  trackRequest(workFlowId: number, requestNumber: number): void {
    this.kycService.getWorkFlowInstanceById(workFlowId, requestNumber).subscribe(
      (response) => {
        
        if (Array.isArray(response.response)) {
          // Arrays to hold data for Initiator and Preview roles
          const initiatorData = [];
          const previewData = [];
          
          response.response.forEach((item: any) => {
            let role: string;

            // Determine the role based on approval_level_id
            if (item.approval.name === "Approval" ) {
              role = 'Initiator';

              initiatorData.push({
                username: item.user?.name || 'N/A',
                email: item.user?.email || 'N/A',
                updatedAt: item.updated_at || 'N/A'
              });
            } else if (item.approval.name === "preview" ) {
              role = 'Preview';
              previewData.push({
                username: item.user?.name || 'N/A',
                email: item.user?.email || 'N/A',
                updatedAt: item.updated_at || 'N/A'
              });
            } else {
              role = 'Unknown';
            }
            
          });
  
          // Assign the data for both roles to component variables
          this.initiatorData = initiatorData;
          this.previewData = previewData;


        } else {
          console.error('Response is not an array:', response);
        }
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  
  
  dismiss() {
    try {
      this.activeModal.dismiss('cancel');
    } catch (error) {
      console.error('Modal dismissal failed:', error);
    }
  }
  
  confirm() {
    try {
      this.activeModal.close('confirm');
    } catch (error) {
      console.error('Modal confirmation failed:', error);
    }
  }
}
