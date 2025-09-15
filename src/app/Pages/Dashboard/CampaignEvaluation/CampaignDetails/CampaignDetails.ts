import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { KYCService } from 'src/app/shared/Services/kyc.service';
import { FieldType } from 'src/app/shared/enums';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ProductService } from 'src/app/shared/Services/product.service';
import { environment } from 'src/environments/environment';
import { PreviewLevelWorkflowComponent } from '../../transfer/our-requests/preview-level-workflow/preview-level-workflow.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

declare const ApexCharts;
declare const Chart: any;
declare const $: any;

@Component({
  templateUrl: './CampaignDetails.html',
  styleUrls: ['./CampaignDetails.css']
})
export class CampaignDetails implements OnInit {
  id:string;
  details:any={};
  campaign_details:any=[];
  field_types=FieldType;
  load:boolean=false;
  err:boolean=false;
   requestData: any;

  reason:string;
  rejection_data:any={};
  evaluation_details:any={};
  options:any={}
  chart:any;
  radar_chart:any;
  risk_cat=[{title:"Low",value:1},{title:"Medium",value:2},{title:"High",value:3},{title:"Extreme",value:4}];
  post_data:any=[];
  min_max:any=[];
  fin_min:number;
  fin_max:number;
  fin_minmax:number=0;
  show_dashboard:boolean=false;
  productList:any=[];
  product_id:string="";
  loanDetails:any={
    borrower_statement:[],
    investor_statement:[],
    organiser_statement:[]
  };
  data_loaded:boolean=false;
  loan_loading:boolean=false;
  graph_data_loaded:boolean=false;
  risk_graph_data_loaded:boolean=false;
  LANG=environment.english_translations;
  show_add_loan:boolean=false;
  show_loan_statement:boolean=false;
  investor_statement:any=[];
  investor_data:any={}
  user_data:any={}
  productListDisplay:boolean= false
  levels:any
  min:number
  max:number
  close_date:Date
  adminName: string;
  originalValue: any;
  constructor(private kyc_service:KYCService,private router:Router,private modalService: NgbModal,private route:ActivatedRoute,private toast:ToastrManager,private productService:ProductService) {
    const user_data=btoa(btoa("user_info"));
    this.levels= localStorage.getItem('userPermissions');

    if(localStorage.getItem(user_data) != undefined){
      this.user_data=JSON.parse(atob(atob(localStorage.getItem(user_data) || '{}')));
    }
    this.route.queryParams
      .subscribe(
        (params: Params) => {
          if (params['id']) {
            this.id = atob(atob(params['id']))
            this.getCampaignDetails();
          }
        }
      )
  }
  allFiledText: any = {};
  actionType: string = '';
  logDateTime: string = '';
  ngOnInit() {
    this.getProductList();
    this.showCampaign();
    this.initializeData();

  }
  pay(invester_id, campaign_id, date) {
    const DATA = {
      campgain_id: campaign_id,
      invester_id: invester_id,
      date: date
    }
    this.kyc_service.investProfit(DATA).subscribe((res: any) => {
      if (res) {

        this.toast.successToastr("Payment success");
      }
    })
  }





  Acceptance(id: number): void {
    const modalRef = this.modalService.open(PreviewLevelWorkflowComponent);
  
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
  
        
      }).catch((reason) => {
        console.error('Modal dismissed with reason:', reason);
      });
    }
  }






  initializeData() {
    this.allFiledText = [];
    this.actionType = "";
    this.logDateTime = 'Opportunity Page'
    this.adminName = localStorage.getItem("name");
  }
  storeOriginalValue(fields: any) {
    this.originalValue = fields;
  }
  onFieldChange(fieldName: string, originalValue: string, change: any): void {
    let value;
    if (originalValue !== undefined)
      value = `${originalValue} => ${change}`;
    else {
      value = `Not Set => ${change}`;
    }
    this.allFiledText.push({ fieldName, value });
  }
  setActionType(action: string): void {
    this.actionType = action;
    this.logDateTime = 'Opportunity Page'
    this.saveChanges();
  }
  saveChanges(): void {
    const data = {
      UserName: this.adminName,
      ActionType: this.actionType,
      LogDateTime: 'Opportunity Page',
    };
    this.kyc_service.storeTrack(data).subscribe((res: any) => {
      if (res) {
        this.allFiledText.map((obj) => {
          obj.Field = obj.fieldName;
          obj.Value = obj.value;
          obj.master_id = res.response.id;
        });
        this.allFiledText.forEach((obj) => {
          this.kyc_service.insertLog(obj).subscribe((res) => { });
        });
      }
    });
  }
  showCampaign() {
    if (this.details.campaign.product_id) {
      this.product_id = this.details.campaign.product_id;
    }
  }

  getCampaignDetails() {
    this.kyc_service.getCampaignDetails(this.id, this.user_data.role_type).subscribe((res: any) => {
      this.details = res.response;
      this.max = this.details.campaign.max_investment
      this.min = this.details.campaign.min_investment
      this.close_date = this.details.campaign.close_date

      if (this.details.campaign) {
        this.campaign_details = Object.entries(this.details.campaign).map(entry => {
          let obj: any = { title: entry[0].split("_").join(" "), value: entry[1] };
          if (entry[0] == "team" || entry[0] == "campaign_images" || entry[0] == "user_id" || entry[0] == "id" || entry[0] == "product_id" || entry[0] == "role_type" || entry[0] == "status" || entry[0] == "master_id" || entry[0] == "approved_status" || entry[0] == "activity") {
            obj = {}
          }
          return obj;
        });

      }

    })
  }

  add(index) {
    const a = [4, 3, 2, 1];
    return a[index];
  }

  getInvestorStatement() {
    const data = { "campaign_id": this.id }
    this.productService.getInvestorList(data).subscribe((res: any) => {
      if (res.status) {
        this.investor_statement = res.response.campaign_investers;
        this.investor_data = res.response.campaign_data;
      }
    })
  }

  inputdisabled: boolean = false


  approveRejectKYC(status: string, type?: number) {
    if (type && this.details.campaign.approved_status == "1" && this.details.campaign_product.role_type == this.user_data.role_type && !this.product_id && this.details.campaign_product.activity == 1) {
      this.toast.warningToastr(this.LANG.Please_select_a_product);
      return
    }
    let message = "KYC Approved";
    if (status == "2") {
      if (this.reason == "" || this.reason == undefined) {
        this.toast.warningToastr(this.LANG.Please_give_reason_for_rejection);
        return
      }
      message = "KYC Rejected";
      const rejectedData = {
        id: this.id,
        textEn: "Your opportunity is rejected. Try again with new details",
        textAr: "بيانات الفرصة غير مكتملة. الرجاء المراجعة وإعادة الإرسال"
      }
      this.kyc_service.sendUserStatus(rejectedData).subscribe(res => {
      })
    }

    this.load = true
    const data: any = {
      "user_id": this.details.campaign ? this.details.campaign.user_id : "",
      "approved_status": status,
      "note": this.reason,
      // "close_date":this.close_date,
      "min": this.min,
      "max": this.max
    }
    if (type || this.rejection_data.id) {
      data.product_id = this.product_id;
      data.campaign_id = this.id;
      data.type = 1;
      data.campaign_approve_type = this.details.campaign.approved_status == "1" && this.details.campaign.product_id ? "3" : this.details.campaign.approved_status == "1" && !this.details.campaign.product_id ? "2" : "1";
      message = "Campaign Approved";
      if (status == "2") {
        message = "Campaign Rejected"
        const rejectedData = {
          id: this.id,
          textEn: "Your opportunity is rejected. Try again with new details",
          textAr: "بيانات الفرصة غير مكتملة. الرجاء المراجعة وإعادة الإرسال"
        }
        this.kyc_service.sendUserStatus(rejectedData).subscribe(res => {
        })
      }
    }
    this.kyc_service.approveRejectKYC(data).subscribe((res: any) => {
      this.load = false;
      if (res.status) {
        this.toast.successToastr(message);
        $("#reject").modal("hide");
        this.reason = "";
        this.getCampaignDetails()
        // this.inputdisabled = true
      }
    })
    if (status == "1") {
      const rejectedData = {
        id: this.id,
        textEn: "Your opportunity is approved. Good luck",
        textAr: "تمت الموافقة على الفرصة. حظاً موفقاً"
      }
      this.kyc_service.sendUserStatus(rejectedData).subscribe(res => {
      })
    }
  }

  reject(type) {
    this.reason = ""
    if (type == 1) {
      this.rejection_data = { id: 1, title: "Campaign" };
      return
    }
    this.rejection_data = { title: "KYC" };
  }

  changeTab(data: any) {
    this.evaluation_details = data;
    this.graph_data_loaded = false;
    this.risk_graph_data_loaded = false;
    setTimeout(() => {
      if (this.evaluation_details.rank_type == 1) {
        setTimeout(() => {
          this.loadRadarGraph();
        }, 100);
        this.graph_data_loaded = true;
        return
      }
      if (this.evaluation_details.rank_type == 2) {
        setTimeout(() => {
          this.loadRiskChart();

        }, 100);
        this.risk_graph_data_loaded = true;
        return
      }
      this.min_max = [];
      this.evaluation_details.category.map((data: any, index: number) => {
        this.fin_minmax = parseFloat(data.value)
        if (index != this.evaluation_details.category.length - 1) {
          this.min_max.push(data.minrange);
          return
        }
        this.min_max.push(data.minrange, data.maxrange);
        this.fin_max = data.maxrange;
      });
      this.fin_min = this.min_max[0];
    }, 100);
  }

  loadRadarGraph(id?: string, rank_type?: number) {

    const { series, categories } = rank_type == 3 ? this.loadRankType() : this.setData();

    var options11 = {
      series: series,
      chart: {
        height: 350,
        width: 300,
        type: 'radar',
        dropShadow: {
          enabled: true,
          blur: 1,
          left: 1,
          top: 1
        }
      },
      stroke: {
        width: 2,
        colors: ['#9283A8', '#D3BD14'],
      },
      fill: {
        opacity: 0.1,
        colors: ['#E8DE9669', '#D4C6E66F']
      },
      markers: {
        size: 0
      },
      xaxis: {
        categories: categories
      },
      dataLabels: {
        enabled: true,
        background: {
          enabled: true,
          borderRadius: 2,
        }
      },
      yaxis: {
        show: false,

        labels: {
          formatter: (val, index) => {
            const a = this.add(index)
            return a;
          }
        }
      }

    };

    if (id) {
      setTimeout(() => {
        const radar_chart = new ApexCharts(document.querySelector(id), options11);
        radar_chart.render();
      }, 500);
      return
    }

    this.radar_chart = new ApexCharts(document.querySelector("#chart1"), options11);
    this.radar_chart.render();

  }

  loadRiskChart() {
    const { series, categories } = this.setData();
    var options = {
      series: series,
      chart: {
        height: 350,
        type: 'radar',
        width: 300,
      },
      stroke: {
        width: 2,
        color: '#00C48A',
      },
      fill: {
        opacity: 0.1,
        color: '#00C48A39',
      },
      xaxis: {
        categories: categories
      },
      yaxis: {

        labels: {
          formatter: (val, index) => {
            const a = this.add(index)
            return a;
          }
        }
      }
    };

    this.chart = new ApexCharts(document.querySelector("#chart2"), options);
    this.chart.render();
  }

  setData() {
    const series = [];
    const categories = [];
    this.evaluation_details.category.map((data: any, index: number) => {
      const values = [];
      data.detail.map((item: any) => {
        if (!item.value) {
          item.value = 0;
        }
        const data_value = item.value ? item.value : 0;
        values.push(data_value);
        categories.push(item.title);
      })
      series.push({
        name: data.title,
        data: values,
        color: index == 0 ? '#9283A8' : '#D3BD14',
      })
    })
    return { series: series, categories: categories }
  }

  applyRanges() {
    const { series } = this.setData();
    this.applyChanges(series, 1)
  }

  applyRiskData() {
    const { series } = this.setData();
    this.applyChanges(series, 2)
  }

  selectRiskCat(data, cat) {
    if (this.evaluation_details.activity != 1 || this.evaluation_details.role_type != this.user_data.role_type) {
      return
    }
    data.value = cat.value;
    data.required = false;
  }

  applyChanges(series, type) {
    this.errorHandler();
    if (this.err) return;
    this.load = true;
    const data = {
      "field": this.post_data,
      "id": this.user_data.id
    }
    this.kyc_service.updateCampaignDetails(data).subscribe((res: any) => {
      this.load = false;
      if (res.status) {
        this.toast.successToastr(this.evaluation_details.title + this.LANG.updated_successfully);
        if (type == 1) {
          this.getCampaignDetails()
          this.radar_chart.updateSeries(series);
          return
        }
        if (type == 2) {
          this.getCampaignDetails()
          this.chart.updateSeries(series);
          return
        }

        return
      }
      this.toast.warningToastr(res.response.message);
    }, err => {
      this.load = false
      this.toast.errorToastr(this.LANG.Something_went_wrong_Please_try_again_later);
    })
  }

  errorHandler() {
    this.err = false;
    this.post_data = [];
    this.evaluation_details.category.map((data: any) => {
      data.detail.map((item: any) => {
        if (item.value == undefined || item.value == "" || !item.value) {
          item.required = true;
          this.err = true;
        } else {
          item.required = false
        }
        if (!this.err) {
          const item_data = { "campaign_id": this.details.campaign.id, "evaluation_id": this.evaluation_details.id, "evaluation_detail_id": item.id, "value": item.value, "evaluation_cat_id": item.evo_cat_id }
          this.post_data.push(item_data);
        }
      });

    })
  }

  applyFinancial() {
    const post_data = [];
    this.evaluation_details.category.map(item => {
      const item_data = { "campaign_id": this.details.campaign.id, "evaluation_id": this.evaluation_details.id, "evaluation_detail_id": "0", "value": this.fin_minmax, "evaluation_cat_id": item.id }
      post_data.push(item_data);
    })
    this.load = true;
    const data = {
      "field": post_data,
      "id": this.user_data.id
    }
    this.kyc_service.updateCampaignDetails(data).subscribe((res: any) => {
      this.load = false;
      if (res.status) {
        this.toast.successToastr(this.evaluation_details.title + this.LANG.updated_successfully);
        return
      }
      this.toast.warningToastr(res.response.message);
    }, err => {
      this.load = false;
      this.toast.errorToastr(this.LANG.Something_went_wrong_Please_try_again_later);
    })
  }

  rangeChanged(items) {
    items.required = false;
  }

  showDashboard() {
    this.show_dashboard = true;
    this.details.evaluation.map((data, index) => {
      this.evaluation_details = data
      const id = `#dash-chart${index}`
      if (data.rank_type != 3) {
        this.loadRadarGraph(id);
        return
      }
      this.loadRadarGraph(id, data.rank_type);
    })
  }

  loadDataTable(type) {
    $('#borrowers').DataTable().destroy();
    $('#investor').DataTable().destroy();
    if (type == 1) {
      setTimeout(() => {
        $('#borrowers').DataTable({
          ordering: false,
          responsive: true,
        });
      }, 100);
      return
    }
    setTimeout(() => {
      $('#investor').DataTable({
        ordering: false,
        responsive: true,
      });
    }, 100);
  }


  showLoan() {
    if (this.details.apply_loan_status == 1) {
      this.show_loan_statement = true;
      this.show_add_loan = false;
      this.addLoan(1);
      return
    }
    this.show_loan_statement = false;
    this.show_add_loan = true;
    // if(this.details.add_loan == 1){
    //   this.addLoan(1);
    // }
  }

  showInvestorStatements() {
    this.getInvestorStatement();
  }

  onSubmit(status) {
    if (status) {
      this.show_add_loan = false;
      this.show_loan_statement = true;
      window.scrollTo(0, 0)
      setTimeout(() => {
        $('#borrowers').DataTable({
          ordering: false,
          responsive: true,
          // buttons: [
          //     'copy', 'csv', 'excel', 'pdf', 'print'
          // ]
        });
        $('#investor').DataTable({
          ordering: false,
          responsive: true,
          // buttons: [
          //     'copy', 'csv', 'excel', 'pdf', 'print'
          // ]
        });
        // $('.buttons-copy, .buttons-csv, .buttons-print, .buttons-pdf, .buttons-excel').addClass('btn btn-primary mr-1');
      }, 100);
    }
  }

  apply(status) {
    if (status) {
      this.addLoan();
    }
  }


  addLoan(type?: number) {
    if (this.details.add_loan == 1 && !type) {
      return
    }
    const data = {
      "campaign_id": this.id
    }
    this.loan_loading = true;
    this.productService.applyLoan(data).subscribe((res: any) => {
      this.show_loan_statement = true;
      if (res.status) {
        this.getStatement();
        return
      }
      this.loan_loading = false;
      this.getStatement();
      if (!type) {
        this.toast.warningToastr(res.response.message)
      }
    })
  }

  addNewLoan() {
    // this.router.navigate(["/dashboard/add-loan"])
    this.show_loan_statement = false;
    this.show_add_loan = true;
  }

  getStatement() {
    const data = {
      "campaign_id": this.id
    }
    this.productService.getStatement(data).subscribe((res: any) => {
      this.loan_loading = false;
      if (res.status) {
        this.loanDetails = res.response;
        this.data_loaded = true;
        $('#borrowers').DataTable().destroy();
        $('#investor').DataTable().destroy();
        setTimeout(() => {
          $('#borrowers').DataTable({
            ordering: false,
            responsive: true,
            // buttons: [
            //     'copy', 'csv', 'excel', 'pdf', 'print'
            // ]
          });
          $('#investor').DataTable({
            ordering: false,
            responsive: true,
            // buttons: [
            //     'copy', 'csv', 'excel', 'pdf', 'print'
            // ]
          });
          // $('.buttons-copy, .buttons-csv, .buttons-print, .buttons-pdf, .buttons-excel').addClass('btn btn-primary mr-1');
        }, 100);

      }
    })
  }

  loadRankType() {
    const series = [];
    const categories = [];
    const values = [];
    this.evaluation_details.category.map((item: any) => {
      if (!item.value) {
        item.value = 0;
      }
      const data_value = item.value ? item.value : 0;
      values.push(data_value);
      categories.push(item.title);
    })
    series.push({
      name: this.evaluation_details.title,
      data: values,
      color: '#9283A8',
    })
    return { series: series, categories: categories }
  }

  getProductList() {
    this.productService.getProductList().subscribe((res: any) => {
      if (res.status) {
        this.productList = res.response;
        this.productListDisplay = true

      }
    })
  }


  changeDate() {
    let data = {
      "date": this.close_date
    }
    this.productService.changeDate(data, this.details.campaign.id).subscribe((res: any) => {
      //this.toast.successToastr(res.message)
      this.toast.successToastr("Succesfully Changed")
      this.getCampaignDetails()
    })
  }



}
