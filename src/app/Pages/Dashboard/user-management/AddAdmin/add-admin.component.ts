import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { UsersService } from 'src/app/shared/Services/user.service';
import { environment } from 'src/environments/environment';
declare const $:any;

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {
  err:boolean=false;
  load:boolean=false;
  name = ""; 
	admin_role_id = "";
	mobile_number = "";
  country_code = "+966";
  role_type=[];
  roleType:any=[];
  department_type:string="";
  status:string="1";
  id:string="";
  editable:boolean=false;
  password:string="";
  email:string="";
  user_type:any=[];
  roles:any=[];
  user_type_id:string="";
  error={
    name:false,
    role_type:false,
    department_type:false,
    mobile_number:false,
    mobile_number_valid:false,
    password:false,
    password_valid:false,
    email:false,
    email_valid:false,
    user_type:false
  };
  LANG=environment.english_translations;



  constructor(private adminService:UsersService,private toastr:ToastrManager,private location:Location,private route:ActivatedRoute) {
    this.route.queryParams
      .subscribe(
        (params: Params) => {
          if(params['id']){
          this.id = atob(atob(params['id']))
          this.getRoles(1);
          this.editable=true;
        }
      }
    )
  }

  ngOnInit() {
    this.loadSelect2();
    if(!this.id){
      this.getUserType();
      this.getRoles();
    }
  }

  getUserDetails(){
    this.adminService.getAdminDetails(this.id).subscribe((res:any)=>{
   
        if(res.status){
          this.user_type_id=res.response.role_type || ""
          this.name=res.response.name;
          this.department_type=res.response.department_type;
          this.status=res.response.status;
          this.country_code=res.response.country_code;
          this.mobile_number=res.response.mobile_number;
          this.email=res.response.email;
          this.password=res.response.password;
          this.role_type=res.response.department_role.toString().split(",");
          this.changeDepartmentType(1)
        }
    })
}

getUserType(type?:number){
  this.adminService.getUserTpe().subscribe((res:any)=>{
    if(res.status){
        this.user_type=res.response;
      

        if(type){
          this.getUserDetails();
        }
    }
})
}

getRoles(type?:number){
  this.adminService.adminDepartments().subscribe((data:any)=>{
    if(data.status){
      this.roleType=data.response;
      if(type){
        this.getUserType(1)
      }
    }
  })
}

  changeDepartmentType(type?:number){
    if(this.department_type == "1"){
      this.roles=this.roleType.menu
    }else{
      this.roles=this.roleType.role
    }
    setTimeout(() => {
      this.loadSelect2();
      if(type){
        $("#role_type").val(this.role_type);
        $("#role_type").trigger('change');
      }
    }, 100);
  }

  loadSelect2(){
    $('#role_type').select2();
  }




  errorHandler(){
    this.role_type=$("#role_type").val() || [];
    if(this.user_type_id == undefined || this.user_type_id == ''){
      this.error.user_type=true;
      this.err=true;	
    }
    if(this.name == undefined || this.name == ''){
        this.error.name=true;
        this.err=true;	
    }

    if(this.email == undefined || this.email == ''){
      this.error.email=true;
      this.err=true;	
  }
  if(this.checkEmail(this.email) && !this.error.email){
      this.error.email_valid=true;	
      this.err=true;
  }

    if(this.department_type == undefined || this.department_type == ''){
      this.error.department_type=true;
      this.err=true;	
    }

    if(this.role_type.length == 0){
      this.error.role_type=true;
      this.err=true;	
    }
    if(this.password == undefined || this.password == ''){
        this.error.password=true;
        this.err=true;	
    }
    if(!this.error.password && this.checkPassword(this.password)){
      this.error.password_valid=true;	
      this.err=true;
    }

    if(this.country_code == "+966"){
      const re=/^([0]{1}[5]{1}[0-9]*)$/
      const re1=/^([5]{1}[0-9]*)$/
      if(!this.error.mobile_number && !re.test(this.mobile_number) && !re1.test(this.mobile_number)){
        this.error.mobile_number_valid=true;	
        this.err=true;
      }

      if(!this.error.mobile_number && re.test(this.mobile_number) && this.mobile_number.length != 10){
        this.error.mobile_number_valid=true;
        this.err=true;	
      }

      if(!this.error.mobile_number && re1.test(this.mobile_number) && this.mobile_number.length != 9){
        this.error.mobile_number_valid=true;
        this.err=true;	
      }
      return
    }
    if(this.country_code == "+91"){
      if(this.error.mobile_number == false && this.mobile_number.length != 10){
        this.error.mobile_number_valid=true;
        this.err=true;	
      }
      return
    }
    if(this.error.mobile_number == false && (this.mobile_number.length < 8 || this.mobile_number.length > 10)){
      this.error.mobile_number_valid=true;
      this.err=true;	
    }
    

}

checkEmail(email:string){
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return !re.test(email)
}


checkPassword(password:string){
  if(password.length < 6){
      return true
  }
  return
} 

resetError(){
    this.err=false;
    this.load=false;
    this.error={
      user_type:false,
      name:false,
      role_type:false,
      department_type:false,
      mobile_number:false,
      mobile_number_valid:false,
      password:false,
      password_valid:false,
      email:false,
      email_valid:false,
    }
}

addUsers(){
  this.resetError();
  this.errorHandler();
  if(this.err){
      return
  }
  const data:any={
    "name": this.name,
    "department_type": this.department_type,
    "department_role": this.role_type.toString(),
    "mobile_number": this.mobile_number,
    "country_code": this.country_code,
    "password":this.password,
    "status": this.status,
    "email": this.email,
    "user_type":this.user_type_id,
    "admin_role_id":"2"
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
  this.adminService.addAdmins(data).subscribe((res:any)=>{
      this.load=false;
      if(res.status){
          this.toastr.successToastr(this.LANG.User_added_successfully);
          this.location.back();
          return
      }
      this.toastr.warningToastr(res.message);

  })
}

update(data){
  this.adminService.updateAdmin(data).subscribe((res:any)=>{
      this.load=false;
      if(res.status){
        this.toastr.successToastr(this.LANG.User_updated_successfully);
        this.location.back();
        return
      }
      this.toastr.warningToastr(res.response.message);
  })
}

}
