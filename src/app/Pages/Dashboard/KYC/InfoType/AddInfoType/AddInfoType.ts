import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import {Location} from '@angular/common';
import { KYCService } from 'src/app/shared/Services/kyc.service';
import { environment } from 'src/environments/environment';

@Component({
  templateUrl: './AddInfoType.component.html',
  styleUrls: ['./AddInfoType.component.css']
})
export class AddInfoTypeComponent implements OnInit {

    id:string="";
    title:string="";
    title_ar:string="";
    status:string="1";
    position:string="1";
    positions:Array<number>=[]
    err:boolean=false;
    load:boolean=false;
    error={
        title:false,
        title_ar:false,
    };
    LANG=environment.english_translations;
  

  constructor(private kycService:KYCService,private toastr:ToastrManager,private route:ActivatedRoute,private location: Location) {
    for(let i=1;i<= 20;i++){
        this.positions.push(i)
    }
    this.route.queryParams
        .subscribe(
          (params: Params) => {
            if(params['id']){
              this.id = atob(atob(params['id']))
              this.getInfoTypeDetails();
            }
          }
    )
   }

  ngOnInit() {
    
  }

 

  errorHandler(){
        if(this.title == undefined || this.title == ''){
            this.error.title=true;
            this.err=true;	
        }
        if(this.title_ar == undefined || this.title_ar == ''){
            this.error.title_ar=true;
            this.err=true;	
        }
       
    
    }

    resetError(){
        this.err=false;
        this.load=false;
        this.error={
            title:false,
            title_ar:false,
        }
    }

    addProductAttribute(){
        this.resetError();
        this.errorHandler();
        if(this.err){
            return
        }
        const data:any={
            "title": this.title,
            "ar_title": this.title_ar,
            "status": this.status,
            "position": this.position,
        }
        this.load=true;
        if(this.id){
            data.id=this.id;
            this.update(data)
            return
        }
        this.add(data)
        
    }

    getInfoTypeDetails(){
        this.kycService.getInfoType(this.id).subscribe((res:any)=>{
            if(res.status){
                this.title=res.response.title;
                this.title_ar=res.response.ar_title;
                this.status=res.response.status;
                this.position=res.response.position;
            }
        })
    }

    add(data){
        this.kycService.addInfoType(data).subscribe((res:any)=>{
            this.load=false;
            if(res.status){
                this.toastr.successToastr(this.LANG.Info_Type_added_successfully);
                this.location.back();
                return
            }
            this.toastr.warningToastr(res.message);

        })
    }

    update(data){
        this.kycService.updateInfoType(data).subscribe((res:any)=>{
            this.load=false;
            if(res.status){ 
                this.toastr.successToastr(this.LANG.Info_Type_updated_successfully);
                this.location.back();
                return
            }
            this.toastr.warningToastr(res.message);
        })
    }



}
