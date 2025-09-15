
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { KYCService } from 'src/app/shared/Services/kyc.service';
import { environment } from 'src/environments/environment';
declare const $:any;

@Component({
  templateUrl: './InvestorList.html',
  styleUrls: ['./InvestorList.css']
})
export class InvestorList implements OnInit {
  campaignList:any=[];
  delete_data:any={};
  load:boolean=false;
  dataTable:any;
  LANG=environment.english_translations;
  user_data:any={};
  id: any;
  details: any;
  campaign: any;
  max: any;
  min: any;
  close_date: any;
  program_number: any;
  version_number: any;
  open_date: any;
  net_sales: any;
  net_profit: any;
  filteredCampaignDetails: { title: string; value: any; }[];
  totalAmount: any=0;

  constructor(private router:Router,private kycService:KYCService,private toast:ToastrManager, private route: ActivatedRoute) {
    const user_data=btoa(btoa("user_info"));
    if(localStorage.getItem(user_data) != undefined){
      this.user_data=JSON.parse(atob(atob(localStorage.getItem(user_data) || '{}')));
    }
  }

  ngOnInit() {
 
    this.route.queryParams
    .subscribe(
      (params: Params) => {
        if(params['id']){
          this.id = atob(atob(params['id']))
         this.getCampaignList();
        
        }
      }
)
  }
  getCampaignDetails(){
    this.kycService.getCampaignDetails(this.id, this.user_data.role_type).subscribe((res: any) => {
     if(res){
      this.details = res.response;
      this.campaign = this.details.campaign;
  
      this.max = this.campaign.max_investment;
      this.min = this.campaign.min_investment;
      this.close_date = this.campaign.close_date;
  
      // Filter the campaign details
      this.filteredCampaignDetails = [
        { title: 'Max Investment', value: `${this.campaign.max_investment} SAR` },
        { title: 'Min Investment', value: `${this.campaign.min_investment} SAR` },
        { title: 'Share Price', value:  `${this.campaign.share_price} SAR` },
        { title: 'Total Valuation', value: `${this.campaign.total_valuation} SAR` },
        { title: 'Investment Percentage', value: `${Math.round((this.totalAmount / this.campaign.max_investment) * 100) }%`},
        { title: 'Close Date', value: this.campaign.close_date },
        { title: 'Open Date', value: this.campaign.open_date },
        { title: 'Number of Sukuk', value: (this.campaign.total_valuation/this.campaign.share_price) },
        { title: 'Total Amount', value: `${this.totalAmount} SAR` },
      ];
     }
    });
  }
 
  getCampaignList(type?:number){
    this.kycService.getInvesterbyId(this.id).subscribe((res:any)=>{
      if(res.status){
        this.campaignList=res.response || [];
        for(let i=0;i<this.campaignList?.length;i++){
          this.totalAmount=this.totalAmount+this.campaignList[i].amount;
        }
        
        if(type){
          this.dataTable.destroy();
        }
        setTimeout(() => {
          this.dataTable=$('#example23').DataTable({
            dom: 'Bfrtip',
            "ordering": false,
            responsive: true,
            buttons: [
                'copy', 'csv', 'excel', 'pdf', 'print'
            ]
        });
        $('.buttons-copy, .buttons-csv, .buttons-print, .buttons-pdf, .buttons-excel').addClass('btn btn-primary mr-1');
        }, 100);
        this. getCampaignDetails();
      }

    })
  }

 

 



 







}






