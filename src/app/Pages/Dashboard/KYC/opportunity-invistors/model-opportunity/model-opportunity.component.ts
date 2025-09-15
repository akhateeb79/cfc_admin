import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { KYCService } from 'src/app/shared/Services/kyc.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-model-opportunity',
  templateUrl: './model-opportunity.component.html',
  styleUrls: ['./model-opportunity.component.css'],
})
export class ModelOpportunityComponent implements OnInit, OnChanges {
  @Input() campaigns: any[] = []; // Ensure campaigns is an array
  @Input() id!: number;

  open_date: string = ''; // Bound to date picker
  LANG=environment.english_translations;

  campaign_name: string = ''; // To store and bind the campaign name
  close_date: string = ''; // Bound to date picker
  investment_status: string = '';
  min_investment: number = 0;

  max_investment: number = 0;
  investment_Statement:any
  share_price: number = 0;
  selectedCampaignId: number | null = null; // To store selected campaign ID

  constructor(private kycService: KYCService,private toast: ToastrManager,public activeModal: NgbActiveModal ,) {}

  ngOnInit(): void {

    this.initializeFields();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['campaigns'] && changes['campaigns'].currentValue) {
      this.initializeFields();
    }
  }

  initializeFields(): void {
    if (this.campaigns.length > 0) {

      const defaultCampaign = this.campaigns.find(
        (campaign) => campaign.id === this.id
      ) || this.campaigns[0];

      if (defaultCampaign) {
        this.selectedCampaignId = defaultCampaign.id;
        this.investment_status = defaultCampaign.investment_status || '';
        this.min_investment = defaultCampaign.min_investment || 0;
        this.max_investment = defaultCampaign.max_investment || 0;
        this.campaign_name = defaultCampaign.tagline || '';
        this.open_date = defaultCampaign.open_date || '';
        this.close_date = defaultCampaign.close_date || '';
        this.share_price = defaultCampaign.share_price || 0;
      }
    }
  }

  updateOpportunity(): void {
    if (!this.selectedCampaignId) {
      console.error('No campaign selected');
      return;
    }
  //   console.log('API Response:',  this.selectedCampaignId,this.open_date,
  //   this.close_date,
  //   this.investment_status,
  //   this.min_investment,
  //   this.max_investment,
  //   this.share_price
  // );
   


    this.kycService
      .editOpportunitySide(
        this.selectedCampaignId,
        this.open_date,
        this.close_date,
        this.campaign_name,
        this.investment_status,
        this.min_investment,
        this.max_investment,
        this.share_price
      )
      .subscribe({
        next: (response) => {
          if(response.status){
           
            this.toast.successToastr( response.response);
            this.confirm()
          }else{
            this.toast.errorToastr( response.response.message
              );
            this.dismiss()
          }
       
        },
        error: (error) => {
          console.error('API Error:', error);
          
          this.toast.errorToastr(this.LANG.Something_went_wrong_Please_try_again_later);
          this.dismiss()
        },
      });
  }


  dismiss() {
    this.activeModal.dismiss('Cancel click');
  }
  confirm() {
    this.activeModal.close('confirm');
  }

}
