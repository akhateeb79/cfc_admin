import { Component, OnInit, ViewChild, Input, SimpleChanges,Output, EventEmitter  } from '@angular/core';
import { ProductService } from 'src/app/shared/Services/product.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import {Location} from '@angular/common';
import { AddPaymentInfoComponent } from '../../PaymentManagement/add-payment-info/add-payment-info.component';
import { ActivatedRoute, Params } from '@angular/router';
import { KYCService } from 'src/app/shared/Services/kyc.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-loan',
  templateUrl: './add-loan.component.html',
  styleUrls: ['./add-loan.component.css']
})
export class AddLoanComponent implements OnInit {
  loan_title:string="";
  loan_title_ar:string="";
  status:string="1";
  loan_type_id:string="";
  // product_id:string="";
  // opportunity_id:string="";
  interest_calculation_method:string;
  accured_interest_posting_frequency:string="";
  default:string;
  min_value:string;
  max_value:string;
  interest_rate:string;
  ir_charged:string="";
  fundraiser_profit:string;
  @Input() product_id: string="";
  @Input() opportunity_id: string="";
  @Input() apply_loan_status: number;
  @Input() loan_id: number;
  @Input() loan_loading: boolean=false;
  input_disabled:boolean=false;
  show_apply_btn:boolean=false;
  campaign_id:any
  
  @Output() onSubmit = new EventEmitter<any>();
  @Output() apply = new EventEmitter<any>();
  @ViewChild(AddPaymentInfoComponent,{static:true}) child: AddPaymentInfoComponent;
  
  
  products=[];
  loanType=[];
  calculation_list=[];
  ir_frequency=[];
  charged_list=[];
  opportunity_list=[];
  err:boolean=false;
  load:boolean=false;
  // id:string;
  LANG=environment.english_translations;
  error={
      loan_title:false,
      loan_title_ar:false,
      product_error:false,
      evaluation_error:false,
      loan_type_error:false,
      interest_calculation_method:false,
      accured_interest_posting_frequency:false, 
      ir_charged:false,
      default:false,
      min_value:false,
      max_value:false,
      interest_rate:false,
      fundraiser_profit:false
  };

  constructor(private productService:ProductService,private kycService:KYCService,private toastr:ToastrManager,private location: Location,private route:ActivatedRoute) { 
    // this.route.queryParams
    //     .subscribe(
    //       (params: Params) => {
    //         // if(params['id']){
    //         //   this.id = atob(atob(params['id']))
    //         //   this.getLoanById();
    //         // }
    //       }
    // )
    
  }

  ngOnInit() {
    this.getProducts();
    this.getLoanType();
    this.getIRCalculationList();
    this.getIDFrequency();
    this.getIRChargedList();
  }

  getLoanById(){
    this.productService.getLoadDetails(this.loan_id).subscribe((res:any)=>{
      if(res.status){
        this.show_apply_btn=true;
        this.product_id=res.response.product_id;
        this.opportunity_id=res.response.opportunity_id;
        this.loan_type_id=res.response.loan_type_id;
        this.loan_title=res.response.title;
        this.loan_title_ar=res.response.ar_title;
        this.status=res.response.status;
        this.interest_calculation_method=res.response.intrest_calc_method_id;
        this.accured_interest_posting_frequency=res.response.accrued_interest_id;
        this.ir_charged=res.response.interest_rate_charged_id;
        this.default=res.response.intrest_rate_constraint_default;
        this.fundraiser_profit=res.response.fundriser_profit;
        this.child.payment_interval_method=res.response.interval_method_id;
        this.child.payment_period=res.response.payment_every;
        this.child.payment_period_id=res.response.payment_every;
        this.child.installments_default=res.response.installments_constraints_default;
        this.child.due_date_default=res.response.first_due_date_default;
        this.child.grace_period=res.response.grace_period_id;
        this.child.grace_period_type=res.response.gracetype;
        this.child.collect_principle=res.response.collect_principle;
        this.child.investor_tax = res.response.investor_tax;
        this.child.borrower_tax = res.response.borrower_tax;
        this.child.fees= res.response.fees
        this.campaign_id = res.response.opportunity_id
      }
  })
  }

  getProducts(){
    this.productService.getProductList().subscribe((res:any)=>{
        if(res.status){
            this.products=res.response
        }
    })
  }

  changeProduct(){
    const data={"product_id": this.product_id};
    this.opportunity_list=[];
    this.opportunity_id="";
    this.kycService.getOpportunityList(data).subscribe((res:any)=>{
      if(res.status){
        this.opportunity_list=res.response;
      }
    })
    
  }

  getLoanType(){
    this.productService.getLoanTypeList().subscribe((res:any)=>{
        if(res.status){
            this.loanType=res.response
        }
    })
  }

  getIRCalculationList(){
    this.productService.getIRCalculationList().subscribe((res:any)=>{
        if(res.status){
            this.calculation_list=res.response;
            this.interest_calculation_method=res.response[0].id;
        }
    })
  }

  getIDFrequency(){
    this.productService.getIRFrequencyList().subscribe((res:any)=>{
        if(res.status){
            this.ir_frequency=res.response;
            this.accured_interest_posting_frequency=res.response[0].id;

        }
    })
  }

  getIRChargedList(){
    this.productService.getIRChargedList().subscribe((res:any)=>{
        if(res.status){
            this.charged_list=res.response
        }
    })
  }

  errorHandler(){
    if(this.loan_title == undefined || this.loan_title == ''){
        this.error.loan_title=true;
        this.err=true;	
    }
    if(this.loan_title_ar == undefined || this.loan_title_ar == ''){
        this.error.loan_title_ar=true;
        this.err=true;	
    }

    if(this.loan_type_id == undefined || this.loan_type_id == ''){
      this.error.loan_type_error=true;
      this.err=true;	
    }

    // if(this.product_id == undefined || this.product_id == ''){
    //   this.error.product_error=true;
    //   this.err=true;	
    // }

    // if(this.opportunity_id == undefined || this.opportunity_id == ''){
    //   this.error.evaluation_error=true;
    //   this.err=true;	
    // }

    if(this.interest_calculation_method == undefined || this.interest_calculation_method == ''){
      this.error.interest_calculation_method=true;
      this.err=true;	
    }

    if(this.accured_interest_posting_frequency == undefined || this.accured_interest_posting_frequency == ''){
      this.error.accured_interest_posting_frequency=true;
      this.err=true;	
    }

    // if(this.ir_charged == undefined || this.ir_charged == ''){
    //   this.error.ir_charged=true;
    //   this.err=true;	
    // }

    if(this.default == undefined || this.default == ''){
      this.error.default=true;
      this.err=true;	
    }

    // if(this.min_value == undefined || this.min_value == ''){
    //   this.error.min_value=true;
    //   this.err=true;	
    // }

    // if(this.max_value == undefined || this.max_value == ''){
    //   this.error.max_value=true;
    //   this.err=true;	
    // }

    if(this.fundraiser_profit == undefined || this.fundraiser_profit == ''){
      this.error.fundraiser_profit=true;
      this.err=true;	
    }

    // if(this.interest_rate == undefined || this.interest_rate == ''){
    //   this.error.interest_rate=true;
    //   this.err=true;	
    // }

    

  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.apply_loan_status && changes.apply_loan_status.currentValue == 1){
      this.input_disabled=true;
    }
    if(changes.loan_id && changes.loan_id.currentValue){
      this.getLoanById();
    }
  }


  addLoan(){
    this.resetError();
    this.errorHandler();
    this.child.addLoan();
    if(this.err || this.child.err){
        return
    }

    const data:any={
      "product_id": this.product_id,
      "opportunity_id": this.opportunity_id,
      "loan_type_id": this.loan_type_id,
      "title": this.loan_title,
      "ar_title": this.loan_title_ar,
      "status":this.status,
      "intrest_calc_method_id": this.interest_calculation_method,
      "accrued_interest_id":this.accured_interest_posting_frequency,
      "interest_rate_charged_id": this.ir_charged,
      "intrest_rate_constraint_default": this.default,
      "intrest_rate_constraint_min": this.min_value,
      "intrest_rate_constraint_max": this.max_value,
      "fundriser_profit": this.fundraiser_profit,
      "loan_id":0,
      "interval_method_id":this.child.payment_interval_method,
      "payment_every":this.child.payment_period,
      "internal_type":this.child.payment_period_id,
      "inst_const_default":this.child.installments_default,
      "inst_const_min":this.child.installments_min_value,
      "inst_const_max":this.child.installments_min_value,
      "first_due_date_default":this.child.due_date_default,
        "investor_tax":  this.child.investor_tax,
        "borrower_tax":this.child.borrower_tax,
        "fees":this.child.fees,
      "first_due_date_min":this.child.due_date_min_value,
      "first_due_date_max":this.child.due_date_max_value,
      "grace_period":this.child.grace_period,
      "grace_period_type":this.child.grace_period_type,
      "collect_principle":this.child.collect_principle
    }
    this.load=true;
    if(this.input_disabled ||  this.loan_id){
        data.id=this.loan_id;
        data.loan_id=this.loan_id;
        this.update(data)
        return
    }
    this.add(data)
  }
btndisable:boolean =false
  applyLoan(){
    // this.apply.emit(true)
    let data={
      "campaign_id":this.campaign_id
    }
    this.productService.applyLoan(data).subscribe((res:any)=>{
      if(res.status == false){
      this.toastr.warningToastr(res.response.message)

      }
      if(res.status== true){
      this.toastr.successToastr(res.response.message)
      this.btndisable= true
      }
    })
  }

  add(data){
    this.productService.addLoan(data).subscribe((res:any)=>{
        this.load=false;
        if(res.status){
            this.toastr.successToastr(this.LANG.Loan_Details_added_successfully);
            // this.location.back();
            // this.show_apply_btn=true;
            // this.onSubmit.emit(true);
            this.loan_id=res.response.loan_id
            this.getLoanById();
            return
        }
        this.toastr.warningToastr(res.message);

    })
  }

  update(data){
    this.productService.updateLoan(data).subscribe((res:any)=>{
        this.load=false;
        if(res.status){
            this.toastr.successToastr(this.LANG.Loan_Details_updated_successfully);
            // this.location.back();
            // this.onSubmit.emit(true);
            this.getLoanById();

            return
        }
        this.toastr.warningToastr(res.message);
    })
}

  // IRChargedChanged(){
  //   this.ir_charged_id=this.ir_charged.split(",")[0];
  //   this.ir_charged_title=this.ir_charged.split(",")[1];
  // }

  resetError(){
      this.err=false;
      this.load=false;
      this.error={
        loan_title:false,
        loan_title_ar:false,
        loan_type_error:false,
        product_error:false,
        evaluation_error:false,
        interest_calculation_method:false,
        accured_interest_posting_frequency:false,
        ir_charged:false,
        default:false,
        min_value:false,
        max_value:false,
        interest_rate:false,
        fundraiser_profit:false

      }
  }

  onlyNumbers(event:any){
    var keycode = (event.which) ? event.which : event.keyCode;
    if ((keycode < 48 || keycode > 57) && keycode !== 13 || keycode == 46) {
      event.preventDefault();
      return false;
    } 
    return   
}

}
