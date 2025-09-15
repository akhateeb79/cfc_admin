import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import {Location} from '@angular/common';
import { KYCService } from 'src/app/shared/Services/kyc.service';
import { environment } from 'src/environments/environment';

@Component({
  templateUrl: './AddKYC.component.html',
  styleUrls: ['./AddKYC.component.css']
})
export class AddKycComponent implements OnInit {
    initialProducts:any={
        "type":"",
        "info_type":"",
        "title":"",
        "ar_title":"",
        "position":"1",
        "status":"1",
        "mandatory":"",
        "length":""
    }
    id:string="";
    kyc_name:string="";
    kyc_name_ar:string="";
    status:string="1";
    position:string="1";
    infoTypeList=[];
    fieldType=[];
    positions:Array<number>=[]
    kyc_details=[{...this.initialProducts}]
    err:boolean=false;
    load:boolean=false;
    error={
        kyc_name:false,
        kyc_name_ar:false,
    };
    LANG=environment.english_translations;


  constructor(private kycService:KYCService,private toastr:ToastrManager,private route:ActivatedRoute,private location: Location) {
    for(let i=1;i<= 20;i++){
        this.positions.push(i)
    }
    this.fieldType=[
        {id:1,title:"Characters"},
        {id:2,title:"Email"},
        {id:3,title:"Textarea"},
        {id:4,title:"Mobile"},
        {id:5,title:"Fileupload"},
        {id:6,title:"Number"},
        {id:7,title:"Date"},
        {id:8,title:"Yes/No"},
        {id:9,title:"Commercial Number"},
        {id:10,title:"Identity"},
        {id:11,title:"Gender"},
        {id:12,title:"Banks"},
        {id:13,title:"FundUse"},
        {id:14,title:"MaritalStatus"},
        {id:15,title:"Education"},
        {id:16,title:"JobStatus"},
        {id:17,title:"Years"},
        {id:18,title:"Months"},
        {id:19,title:"Days"},
        {id:20,title:"GrossIncome"},
        {id:21,title:"Cities"}
    ]
    this.route.queryParams
        .subscribe(
          (params: Params) => {
            if(params['id']){
              this.id = atob(atob(params['id']))
              this.getKYCDetails();
            }
          }
    )
   }

  ngOnInit() {
    this.getInfoTypeList();
  }

  getInfoTypeList(){
    this.kycService.getInfoTypeList().subscribe((res:any)=>{
        if(res.status){
            this.infoTypeList=res.response
        }
    })
  }

  addMore(){
    const new_product={...this.initialProducts};
    new_product.position=(this.kyc_details.length+1).toString();
    this.kyc_details.push(new_product);
  }

  remove(i){
    this.kyc_details.splice(i,1)
  }

  errorHandler(){
        if(this.kyc_name == undefined || this.kyc_name == ''){
            this.error.kyc_name=true;
            this.err=true;
        }
        if(this.kyc_name_ar == undefined || this.kyc_name_ar == ''){
            this.error.kyc_name_ar=true;
            this.err=true;
        }
        this.kyc_details.map(data=>{
            if(data.title == "" || data.title == undefined){
                data.title_error=true;
                this.err=true
            }else{
                data.title_error=false;
            }
            if(data.ar_title == "" || data.ar_title == undefined){
                data.ar_title_error=true;
                this.err=true
            }else{
                data.ar_title_error=false;
            }
            if(data.type == "" || data.type == undefined){
                data.type_error=true;
                this.err=true
            }else{
                data.type_error=false;
            }
            if(data.info_type == "" || data.info_type == undefined){
                data.info_type_error=true;
                this.err=true
            }else{
                data.info_type_error=false;
            }
            if(data.mandatory === "" || data.mandatory === undefined){
                data.mandatory_error=true;
                this.err=true
            }else{
                data.mandatory_error=false;
            }
        })

    }

    resetError(){
        this.err=false;
        this.load=false;
        this.error={
            kyc_name:false,
            kyc_name_ar:false,
        }
    }

    addProductAttribute(){
        this.resetError();
        this.errorHandler();
        if(this.err){
            return
        }
        const data:any={
            "title": this.kyc_name,
            "ar_title": this.kyc_name_ar,
            "status": this.status,
            "position": this.position,
            "kyc_detail":this.kyc_details
        }
        this.load=true;
        if(this.id){
            data.id=this.id;
            this.update(data)
            return
        }
        this.add(data)

    }

    getKYCDetails(){
        this.kycService.getKYCDetails(this.id).subscribe((res:any)=>{
            if(res.status){
                this.kyc_name=res.response.title;
                this.kyc_name_ar=res.response.ar_title;
                this.status=res.response.status;
                this.position=res.response.position;
                this.kyc_details=res.response.kyc_detail || [{...this.initialProducts}];
                this.kyc_details.map(data=>{
                    data.detail_title=data.title,
                    data.detail_ar_title=data.ar_title
                })
            }
        })
    }

    add(data){
        this.kycService.addKYC(data).subscribe((res:any)=>{
            this.load=false;
            if(res.status){
                this.toastr.successToastr(this.LANG.KYC_added_successfully);
                this.location.back();
                return
            }
            this.toastr.warningToastr(res.message);

        })
    }

    update(data){
        this.kycService.updateKYC(data).subscribe((res:any)=>{
            this.load=false;
            if(res.status){
                this.toastr.successToastr(this.LANG.KYC_updated_successfully);
                this.location.back();
                return
            }
            this.toastr.warningToastr(res.message);

        })
    }



}
