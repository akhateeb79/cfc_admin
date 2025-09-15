import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { UsersService } from 'src/app/shared/Services/user.service';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-admin-ip',
  templateUrl: './add-admin-ip.component.html',
  styleUrls: ['./add-admin-ip.component.css']
})
export class AddAdminIpComponent implements OnInit { 
  err:boolean=false;
  load:boolean=false;
  name = "";
  error={
    name:false, 
  };
  LANG=environment.english_translations;
  constructor(private adminService:UsersService,private toastr:ToastrManager,private location:Location) { }

  ngOnInit() {
  }

  errorHandler(){
    if(this.name == undefined || this.name == ''){
        this.error.name=true;
        this.err=true;	
    }
  }

  resetError(){
    this.err=false;
    this.load=false;
    this.error={
      name:false
    }
  }

  AddIp(){
    this.resetError();
    this.errorHandler();
    if(this.err){
        return
    }
    const data:any={
      "ip": this.name
    }
    this.load=true;
    // if(this.id){
    //     data.id=this.id;
    //     this.update(data)
    //     return
    // }
    this.add(data)
    
  }

  add(data){
    this.adminService.addAdminIp(data).subscribe((res:any)=>{
        this.load=false;
        if(res.status){
            this.toastr.successToastr(this.LANG.Ip_added_successfully);
            this.location.back();
            return
        }
        this.toastr.warningToastr(res.message);
  
    })
  }
  
  

}
