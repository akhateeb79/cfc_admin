import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { UsersService } from 'src/app/shared/Services/user.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-add-email-templates',
  templateUrl: './add-email-templates.component.html',
  styleUrls: ['./add-email-templates.component.css']
})
export class AddEmailTemplatesComponent implements OnInit {
  err:boolean=false;
  load:boolean=false;
  title:string="";
  ar_title:string="";
  subject:string="";
  ar_subject:string="";
  message:string="";
  ar_message:string="";
  module:string="";
  id:string="";
  templates_type:any=[];
  error={
    title:false,
    ar_title:false,
    ar_subject:false,
    subject:false,
    message:false,
    ar_message:false,
    module:false,
  };
  LANG=environment.english_translations;

  constructor(private adminService:UsersService,private toastr:ToastrManager,private location:Location,private route:ActivatedRoute) {
    this.route.queryParams
    .subscribe(
      (params: Params) => {
        if(params['id']){
        this.id = atob(atob(params['id']))
        this.getUserDetails();
      }
    }
  )
  }

  ngOnInit() {
    this.getTemplatesType();
  }

  getUserDetails(){
    this.adminService.getTemplatesDetails(this.id).subscribe((res:any)=>{
        if(res.status){
            this.title=res.response.title;
            this.ar_title=res.response.ar_title;
            this.subject=res.response.subject;
            this.ar_subject=res.response.ar_subject;
            this.message=res.response.message;
            this.ar_message=res.response.ar_message;
            this.module=res.response.module.toString();
        }
    })
  }


  getTemplatesType(){
    this.adminService.getTemplatesType().subscribe((data:any)=>{
      if(data.status){
        this.templates_type=data.response;
      }
    })
  }

  errorHandler(){
    if(this.title == undefined || this.title == ''){
        this.error.title=true;
        this.err=true;	
    }

    if(this.ar_title == undefined || this.ar_title == ''){
      this.error.ar_title=true;
      this.err=true;	
    }

    
    if(this.subject == undefined || this.subject == ''){
        this.error.subject=true;
        this.err=true;	
    }

    if(this.ar_subject == undefined || this.ar_subject == ''){
      this.error.ar_subject=true;
      this.err=true;	
  }

  if(this.message == undefined || this.message == ''){
    this.error.message=true;
    this.err=true;	
}
if(this.ar_message == undefined || this.ar_message == ''){
  this.error.ar_message=true;
  this.err=true;	
}
if(this.module == undefined || this.module == ''){
  this.error.module=true;
  this.err=true;	
}
    

  }

  resetError(){
    this.err=false;
    this.load=false;
    this.error={
      title:false,
      ar_title:false,
      ar_subject:false,
      subject:false,
      message:false,
      ar_message:false,
      module:false,
    }
  }

  addTemplate(){
  this.resetError();
  this.errorHandler();
  if(this.err){
      return
  }
  const data:any={
    "title":this.title,
    "ar_title":this.ar_title,
    "subject":this.subject,
    "ar_subject": this.ar_subject,
    "message": this.message,
    "ar_message": this.ar_message,
    "module":this.module,
    "type":"2",
  }
  this.load=true;
  if(this.id){
      data.id=this.id;
      this.update(data)
      return
  }
  this.add(data)

  }

  add(data){
  this.adminService.addEmailTemplates(data).subscribe((res:any)=>{
      this.load=false;
      if(res.status){
          this.toastr.successToastr(this.LANG.Template_added_successfully);
          this.location.back();
          return
      }
      this.toastr.warningToastr(res.message);

  })
  }

  update(data){
  this.adminService.updateEmailTemplates(data).subscribe((res:any)=>{
      this.load=false;
      if(res.status){
        this.toastr.successToastr(this.LANG.Template_updated_successfully);
        this.location.back();
        return
      }
      this.toastr.warningToastr(res.response.message);
  })
  }

}
