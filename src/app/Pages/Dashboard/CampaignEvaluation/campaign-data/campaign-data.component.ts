import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { KYCService } from 'src/app/shared/Services/kyc.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-campaign-data',
  templateUrl: './campaign-data.component.html',
  styleUrls: ['./campaign-data.component.css']
})
export class CampaignDataComponent implements OnInit {
  LANG=environment.english_translations;
  campaign_details:any=[];
  user_data:any={};
  id:string="";
  details:any={};
  campaign:any={};
  min:number
  max:number
  close_date:Date
  load:boolean=false;
  @ViewChild('program_number', {static: false}) program_number!: ElementRef;
  @ViewChild('version_number', {static: false}) version_number!: ElementRef;
  @ViewChild('open_date', {static: false}) open_date!: ElementRef;
  @ViewChild('net_sales', {static: false}) net_sales!: ElementRef;
  @ViewChild('net_sales_years', {static: false}) net_sales_years!: ElementRef;
  @ViewChild('net_profit', {static: false}) net_profit!: ElementRef;
  @ViewChild('net_profit_years', {static: false}) net_profit_years!: ElementRef;
  @ViewChild('cash_flow', {static: false}) cash_flow!: ElementRef;
  @ViewChild('return_on_assets', {static: false}) return_on_assets!: ElementRef;
  @ViewChild('debt_of_assets', {static: false}) debt_of_assets!: ElementRef;
  @ViewChild('fin_statement_year', {static: false}) fin_statement_year!: ElementRef;
  @ViewChild('due_date', {static: false}) due_date!: ElementRef;
  @ViewChild('APR', {static: false}) APR!: ElementRef;
  @ViewChild('info_Statement_date_G', {static: false}) info_Statement_date_G!: ElementRef;
  @ViewChild('info_Statement_date_h', {static: false}) info_Statement_date_h!: ElementRef;  
  @ViewChild('financing_type', {static: false}) financing_type!: ElementRef<HTMLSelectElement>;
  @ViewChild('fund_use', {static: false}) fund_use!: ElementRef<HTMLSelectElement>;
  @ViewChild('financing_period', {static: false}) financing_period!: ElementRef;
  @ViewChild('obtain_finance_dt', {static: false}) obtain_finance_dt!: ElementRef;
  @ViewChild('finance_repayment_dt', {static: false}) finance_repayment_dt!: ElementRef;
  
  fundUseList: Map<string, string> = new Map<string, string>();
  financingType: Map<string, string> = new Map<string, string>();
  error={
    version_number:false,
    open_date:false,
    net_sales:false,
    program_number:false,
    return_on_assets:false,
    net_sales_years:false,
    net_profit:false,
    net_profit_years:false,
    cash_flow:false,
    debt_of_assets:false,
    fin_statement_year:false,
    APR:false,
    info_Statement_date_G:false,
    info_Statement_date_h:false,
    // info_Statement_date_G:false,
    // info_Statement_date_h:false,
    financing_type:false,
    fund_use:false,
    financing_period:false,
    obtain_finance_dt:false,
    finance_repayment_dt:false,
    due_date:false
};
  constructor(private router: Router, private route: ActivatedRoute, private kycService: KYCService, private toast: ToastrManager) {
    const user_data=btoa(btoa("user_info"));
    if(localStorage.getItem(user_data) != undefined){
      this.user_data=JSON.parse(atob(atob(localStorage.getItem(user_data) || '{}')));
    }
    this.route.queryParams
        .subscribe(
          (params: Params) => {
            if(params['id']){
              this.id = atob(atob(params['id']))
              this.getCampaignDetails();
            }
          }
    )
  }

  ngOnInit() {
  this.getFinancingTyp();
  this.getFundUseList();
  }
  getCampaignDetails(){
    this.kycService.getCampaignDetails(this.id,this.user_data.role_type).subscribe((res:any)=>{
      this.details=res.response; 
      this.max = this.details.campaign.max_investment
      this.min = this.details.campaign.min_investment
      this.close_date = this.details.campaign.close_date
      this.campaign = this.details.campaign
     this.program_number.nativeElement.value=this.campaign.program_number
     this.version_number.nativeElement.value=this.campaign.version_number
       this.open_date.nativeElement.value=this.campaign.open_date
       this.net_sales.nativeElement.value=this.campaign.net_sales
      this.net_sales_years.nativeElement.value=this.campaign.net_sales_years
       this.net_profit.nativeElement.value=this.campaign.net_profit
      this.net_profit_years.nativeElement.value=this.campaign.net_profit_years
       this.cash_flow.nativeElement.value=this.campaign.cash_flow
       this.return_on_assets.nativeElement.value=this.campaign.return_on_assets
       this.debt_of_assets.nativeElement.value=this.campaign.debt_of_assets
       this.fin_statement_year.nativeElement.value=this.campaign.fin_statement_year
       this.due_date.nativeElement.value=this.campaign.due_date
       this.APR.nativeElement.value=this.campaign.APR
       this.info_Statement_date_G.nativeElement.value=this.campaign.info_Statement_date_G
       this.info_Statement_date_h.nativeElement.value=this.campaign.info_Statement_date_h
     this.financing_type.nativeElement.value=this.campaign.financing_type
       this.fund_use.nativeElement.value=this.campaign.fund_use
       this.financing_period.nativeElement.value=this.campaign.financing_period
       this.obtain_finance_dt.nativeElement.value=this.campaign.obtain_finance_dt
      this.finance_repayment_dt.nativeElement.value=this.campaign.finance_repayment_dt
      if(this.details.campaign){
        this.campaign_details = Object.entries(this.details.campaign).map(entry => {
          let obj:any={title: entry[0].split("_").join(" "),value:entry[1]};
          if(entry[0] == "team" || entry[0] == "campaign_images" || entry[0] == "user_id" || entry[0] == "id" || entry[0] == "product_id" || entry[0] == "role_type" || entry[0] == "status" || entry[0] == "master_id" || entry[0] == "approved_status" || entry[0] == "activity"){
            obj={}
          }
          return obj;
        });

      }

    })
  }

  // updateCampaignData(){

  // }

  updateCampaignData(){
    this.load=true;
    const data={
      "id":this.campaign.id,
      "program_number" : this.program_number.nativeElement.value,
      "version_number" : this.version_number.nativeElement.value,
      "open_date" : this.open_date.nativeElement.value,
      "net_sales" : this.net_sales.nativeElement.value,
      "net_sales_years" : this.net_sales_years.nativeElement.value,
      "net_profit" : this.net_profit.nativeElement.value,
      "net_profit_years" :this.net_profit_years.nativeElement.value,
      "cash_flow" : this.cash_flow.nativeElement.value,
      "return_on_assets" : this.return_on_assets.nativeElement.value,
      "debt_of_assets" : this.debt_of_assets.nativeElement.value,
      "fin_statement_year" : this.fin_statement_year.nativeElement.value,
      "due_date" : this.due_date.nativeElement.value,
      "APR" : this.APR.nativeElement.value,
      "info_Statement_date_G" : this.info_Statement_date_G.nativeElement.value,
      "info_Statement_date_h" : this.info_Statement_date_h.nativeElement.value,
      "financing_type" :this.financing_type.nativeElement.value,
      "fund_use" : this.fund_use.nativeElement.value,
      "financing_period" : this.financing_period.nativeElement.value,
      "obtain_finance_dt" : this.obtain_finance_dt.nativeElement.value,
      "finance_repayment_dt" :this.finance_repayment_dt.nativeElement.value,
    }
    this.kycService.updateCampaignData(data).subscribe((res:any)=>{
      this.load=false;
      if(res.status){
        this.toast.successToastr(this.campaign.tagline + this.LANG.updated_successfully);
        return
      }
      this.toast.warningToastr(res.response.message);
    },err=>{
      this.load=false
      this.toast.errorToastr(this.LANG.Something_went_wrong_Please_try_again_later);
    })
  }
    /*************************************************************************/
    getFinancingTyp() {
      this.financingType = new Map<string, string>([
        ['1', 'تمويل المشاريع'],
        ['2', 'مستخلصات'],
        ['3', 'تمويل رأس المال العامل '],
      ]);
      return this.financingType;
    }
      /*************************************************************************/
  getFundUseList() {
    this.fundUseList = new Map<string, string>([
      ['1', 'نفقات تشغيلية'],
      ['2', 'مشتريات'],
      ['3', 'تأجير'],
      ['4', 'رواتب'],
      ['5', 'اخرى'],
    ]);
    return this.fundUseList;
  }
}
