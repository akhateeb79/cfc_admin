import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import {Location} from '@angular/common';
import { KYCService } from 'src/app/shared/Services/kyc.service';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare const $:any;
@Component({
  templateUrl: './PagesParameters.html',
  styleUrls: ['./PagesParameters.component.css']
})
export class PagesParametersComponent implements OnInit {
delete_data:any={};
id:string="";
title:string="";
ar_title:string="";
description:string="";
ar_description:string="";
status:string="1";
position:string="1";
type:string=""
infoTypeList=[];
pages_list=[];
dataTable:any;
fieldType=[];
positions:Array<number>=[]
err:boolean=false;
load:boolean=false;
error={
    title:false,
    ar_title:false,
    description:false,
    ar_description:false,
};
LANG=environment.english_translations;
types:string
selectTupe:any
descriptionForm:FormGroup;
ckeditorContent:any;


constructor(private router:Router,private kycService:KYCService,private toastr:ToastrManager,private route:ActivatedRoute,private location: Location,private formBuilder: FormBuilder) {
    this.descriptionForm = this.formBuilder.group({
        'title':['',Validators.required],
        'ar_title':['',Validators.required],

    })
for(let i=1;i<= 20;i++){
    this.positions.push(i)
}

this.route.queryParams
    .subscribe(
      (params: Params) => {
        if(params['id']){
          this.id = params['id'];

        }
      }
)
}

ngOnInit() {
    this.getPages()

}
getPages(type?:number){


const data:any={
    "id": this.id
    }
    this.kycService.getPagesParameters().subscribe((res:any)=>{
      if(res.status){
        this.pages_list=res.response;
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
      }
    })
  }


errorHandler(){
    const description=$("#editor").val();
    const ar_description=$("#editor1").val();

    if(this.title == undefined || this.title == ''){
        this.error.title=true;
        this.err=true;
    }
    if(this.ar_title == undefined || this.ar_title == ''){
        this.error.ar_title=true;
        this.err=true;
    }

    if(description == undefined || description == ''){
      this.error.description=true;
      this.err=true;
  }

  if(ar_description == undefined || ar_description == ''){
    this.error.ar_description=true;
    this.err=true;
}

}

resetError(){
    this.err=false;
    this.load=false;
    this.error={
        title:false,
        ar_title:false,
        description:false,
        ar_description:false,
    }
}

addProductAttribute(){

   // this.resetError();
   // this.errorHandler();




    const data:any={
        "keyword": this.descriptionForm.controls.title.value,
       "id":this.id,
        "replace_keyword": this.descriptionForm.controls.ar_title.value

    }
    this.load=true;

    this.add(data)
    if(this.id){
    this.toastr.successToastr(this.LANG.KYC_updated_successfully);
    }

}

getKYCDetails(){
    this.kycService.getPagesDetails(this.id).subscribe((res:any)=>{
        if(res.status){
            this.title=res.response.title;
            this.ar_title=res.response.ar_title;
            this.description=res.response.description;
            this.ar_description=res.response.ar_description;
            this.status=res.response.status;
            this.position=res.response.position;
            this.type = res.response.title
            $('#editor').summernote('code', this.description);
            $('#editor1').summernote('code', this.ar_description);

        }
    })
}

add(data){
    this.kycService.addPagesParameters(data).subscribe((res:any)=>{
        this.load=false;
        if(res.status){
            this.toastr.successToastr(this.LANG.KYC_added_successfully);
            this.location.back();
            return
        }
        this.toastr.warningToastr(res.message);

    })
}



getType(){
    this.kycService.getType().subscribe((res:any)=>{
        this.types = res.response
    })
}
edit(data){
    this.title = data.keyword;
    this.ar_title = data.replace_with;
    this.id=data.id;
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
 });
    //this.router.navigate(["/dashboard/page-parameters"],{queryParams:{id:data.id}})
  }

selectedType(number:any){

    this.selectTupe = number


}
showDeleteModal(data){
    $("#delete").modal("show");
    this.delete_data=data;
  }

  cancel(){
    this.delete_data={};
  }

  delete(){
    this.load=true;
    const data={"id":this.delete_data.id}
    this.kycService.deleteparams(data).subscribe((res:any)=>{
      this.load=false
      if(res.status){
      $("#delete").modal("hide");

        this.toastr.successToastr(this.LANG.Evaluation_deleted_successfully);
       // this.getPages(1)
        //return
        this.router.navigate(["/dashboard/page-parameters"])
      }
      this.toastr.warningToastr(res.response.message);
    })
  }

}
