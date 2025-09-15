import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { KYCService } from 'src/app/shared/Services/kyc.service';
import { ModelOpportunityComponent } from './model-opportunity/model-opportunity.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-opportunity-invistors',
  templateUrl: './opportunity-invistors.component.html',
  styleUrls: ['./opportunity-invistors.component.css']
})
export class OpportunityInvistorsComponent implements OnInit {
  campaigns: any[] = []; // Store campaigns here
  selectedCampaign: string = ''; // To track the selected campaign
    LANG=environment.english_translations;
  constructor(private kycService: KYCService,private modalService: NgbModal) { 




  }

  ngOnInit() {
    this.OpportunityComp()
  }


OpportunityComp(){
  this.kycService.getListingCampaign().subscribe({
    next: (data) => {
      this.campaigns = data.response; // Populate campaigns
    

    },
    error: (error) => {
      console.error('Error fetching campaigns:', error);
    }
  });

}


onCampaignSelect(campaign: string): void {
  this.selectedCampaign = campaign;
}

openModal(id: number) {
  if (!this.campaigns || this.campaigns.length === 0) {
    console.error('Campaigns data not loaded yet.');
    return;
  }

  const modalRef = this.modalService.open(ModelOpportunityComponent);
  modalRef.componentInstance.campaigns = this.campaigns;
  modalRef.componentInstance.id = id;

  modalRef.result.then((result) => {
    if (result === 'confirm') {
      this.OpportunityComp();
    }
  });
}


}
