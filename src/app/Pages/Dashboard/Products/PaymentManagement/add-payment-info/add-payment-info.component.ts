import { Component, OnInit ,Input} from '@angular/core';
import { ProductService } from 'src/app/shared/Services/product.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import {Location} from '@angular/common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-payment-info',
  templateUrl: './add-payment-info.component.html',
  styleUrls: ['./add-payment-info.component.css']
})
export class AddPaymentInfoComponent implements OnInit {
  payment_interval_method:number=0;
  payment_period:string="";
  payment_period_id:string="";
  installments_default:string;
  installments_min_value:string;
  installments_max_value:string;
  due_date_default:string;
  due_date_min_value:string;
  due_date_max_value:string;
  collect_principle:string;
  grace_period:string="";
  grace_period_type:number=0;
  investor_tax:number
  borrower_tax:number
  fees:number
  @Input() input_disabled: boolean=false;
  @Input() loan_id: number;

  payment_intervals=[];
  payment_period_list=[{id:1,title:"Day"},{id:2,title:"Week"},{id:3,title:"Month"},{id:4,title:"Year"}];
  grace_period_list=[];
  err:boolean=false;
  load:boolean=false;
  error={
    payment_interval_method:false,
    payment_period:false,
    payment_period_id:false,
    installments_default:false,
    installments_min_value:false,
    installments_max_value:false,
    collect_principle:false,
    due_date_default:false,
    due_date_min_value:false,
    due_date_max_value:false,
    grace_period:false,
    grace_period_type:false,
    investor_tax:false,
    borrower_tax:false,
    fees:false,
    default:false,
    fundraiser_profit:false
  };
  LANG=environment.english_translations;

  constructor(private productService:ProductService,private toastr:ToastrManager,private location: Location) { }

  ngOnInit() {
    this.getGracePeriodList();
    this.getPaymentIntervals();

  }

  getPaymentIntervals(){
    this.productService.getPaymentIntervalsList().subscribe((res:any)=>{
        if(res.status){
            this.payment_intervals=res.response
        }
    })
  }

  submit(){
  }



  getGracePeriodList(){
    this.productService.getGracePeriodList().subscribe((res:any)=>{
        if(res.status){
            this.grace_period_list=res.response
        }
    })
  }

  errorHandler(){
    if(this.payment_interval_method == undefined || this.payment_interval_method == null || this.payment_interval_method == 0){
        this.error.payment_interval_method=true;
        this.err=true;
    }


    if(this.payment_interval_method != 2 && this.payment_interval_method != 0){
      if(this.payment_period == undefined || this.payment_period == ''){
        this.error.payment_period=true;
        this.err=true;
    }

    if(this.payment_period_id == undefined || this.payment_period_id == ''){
      this.error.payment_period_id=true;
      this.err=true;
    }
    }

    if(this.investor_tax == undefined || this.investor_tax == null){
      this.error.investor_tax=true;
      this.err=true;
    }

    if(this.borrower_tax == undefined || this.borrower_tax == null){
      this.error.borrower_tax=true;
      this.err=true;
    }

    if(this.fees == undefined || this.fees == null){
      this.error.fees=true;
      this.err=true;
    }

    if(this.installments_default == undefined || this.installments_default == ''){
      this.error.installments_default=true;
      this.err=true;
    }

    // if(this.installments_min_value == undefined || this.installments_min_value == ''){
    //   this.error.installments_min_value=true;
    //   this.err=true;
    // }

    // if(this.installments_max_value == undefined || this.installments_max_value == ''){
    //   this.error.installments_max_value=true;
    //   this.err=true;
    // }

    if(this.due_date_default == undefined || this.due_date_default == ''){
      this.error.due_date_default=true;
      this.err=true;
    }

    // if(this.due_date_min_value == undefined || this.due_date_min_value == ''){
    //   this.error.due_date_min_value=true;
    //   this.err=true;
    // }

    // if(this.due_date_max_value == undefined || this.due_date_max_value == ''){
    //   this.error.due_date_max_value=true;
    //   this.err=true;
    // }

    // if(this.collect_principle == undefined || this.collect_principle == ''){
    //   this.error.collect_principle=true;
    //   this.err=true;
    // }

    if(this.grace_period_type == null || this.grace_period_type == 0){
      this.error.grace_period_type=true;
      this.err=true;
    }
    if(this.grace_period_type && this.grace_period_type != 1){

      if(this.grace_period == undefined || this.grace_period == ''){
        this.error.grace_period=true;
        this.err=true;
      }
    }






  }


  addLoan(){
    this.resetError();
    this.errorHandler();

    if(this.err){
        return
    }

    // const data:any={
    //   "loan_id":0,
    //   "interval_method_id":this.payment_interval_method,
    //   "payment_every":this.payment_period,
    //   "internal_type":this.payment_period_id,
    //   "inst_const_default":this.installments_default,
    //   "inst_const_min":this.installments_min_value,
    //   "inst_const_max":this.installments_min_value,
    //   "first_due_date_default":this.due_date_default,
    //   "first_due_date_min":this.due_date_min_value,
    //   "first_due_date_max":this.due_date_max_value,
    //   "grace_period":this.grace_period,
    //   "grace_period_type":this.grace_period_type,
    //   "collect_principle":this.collect_principle
    // }
    this.load=true;
    // if(this.id){
    //     data.id=this.id;
    //     this.update(data)
    //     return
    // }
    // this.add(data)
  }

  add(data){
    this.productService.addPaymentInfo(data).subscribe((res:any)=>{
        this.load=false;
        if(res.status){
            this.toastr.successToastr(this.LANG.Loan_Details_added_successfully);
            this.location.back();
            return
        }
        this.toastr.warningToastr(res.message);

    })
  }

  resetError(){
      this.err=false;
      this.load=false;
      this.error={
        payment_interval_method:false,
        payment_period:false,
        payment_period_id:false,
        installments_default:false,
        installments_min_value:false,
        installments_max_value:false,
        collect_principle:false,
        due_date_default:false,
        due_date_min_value:false,
        due_date_max_value:false,
        grace_period:false,
        grace_period_type:false,
        investor_tax:false,
        borrower_tax:false,
        fees:false,
        default:false,
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
