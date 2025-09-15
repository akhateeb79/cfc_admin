import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { KYCService } from 'src/app/shared/Services/kyc.service';
import { UsersService } from 'src/app/shared/Services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-opportunity-setup',
  templateUrl: './opportunity-setup.component.html',
  styleUrls: ['./opportunity-setup.component.css']
})
export class OpportunitySetupComponent implements OnInit {
  opportunity_list:any=[];
  roles:any=[];
  steps:any=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
  LANG=environment.english_translations;
  opportunity_id:string="";
  opportunity_error:boolean=false;
  error:any={};
  evaluation_list:any=[]
  user_data:any={}
  post_data:any=[];
  load:boolean=false;
  err:boolean=false;
  // initial_data_1={
  //   "master_id":1,
  //   "steps":1,
  //   "role":"",
  //   "activity":0,
  //   "master_type":0,
  //   "title":this.LANG.KYC
  // }
  initial_data_2={
    "master_id":1,
    "steps":1,
    "role":"",
    "activity":0,
    "master_type":0,
    "title":this.LANG.Opportunities
  }
  initial_data_3={
    "master_id":2,
    "steps":2,
    "role":"",
    "activity":0,
    "master_type":0,
    "title":this.LANG.Opportunity_Product
  }
  initial_data_4={
    "master_id":3,
    "steps":3,
    "role":"",
    "activity":0,
    "master_type":0,
    "title":this.LANG.Opportunity_Publish
  }
  initial_data_5={
    "master_id":4,
    "steps":4,
    "role":"",
    "activity":0,
    "master_type":0,
    "title":this.LANG.Investment_Details
  }
  initial_data_6={
    "master_id":5,
    "steps":5,
    "role":"",
    "activity":0,
    "master_type":0,
    "title":this.LANG.Loan_Management
  }
  constructor(private kyc_service:KYCService,private toast:ToastrManager,private adminService:UsersService) { 
    const user_data=btoa(btoa("user_info"));
    if(localStorage.getItem(user_data) != undefined){
      this.user_data=JSON.parse(atob(atob(localStorage.getItem(user_data) || '{}')));
    }
    // this.post_data.push(this.initial_data_1)
    this.post_data.push(this.initial_data_2)
  }

  ngOnInit() {
    this.getCampaignList();
    this.getRoles();
    this.getEvaluationList();
  }

  getCampaignList(){
    this.kyc_service.getAllCampaignList().subscribe((res:any)=>{
      if(res.status){
        this.opportunity_list=res.response || [];
      }
    })
  }

  getRoles(){
    this.adminService.getUserTpe().subscribe((res:any)=>{
      if(res.status){
        this.roles=res.response;
        
      }
    })
  }


  getEvaluationList(){
    this.kyc_service.getEvaluationList().subscribe((res:any)=>{
      this.evaluation_list=res.response;
      if(this.evaluation_list.length > 0){
        this.post_data=[];
        // this.post_data.push(this.initial_data_1)
        this.post_data.push(this.initial_data_2)
        this.evaluation_list.map((data,index)=>{
          const item={
            "master_id":data.id,
            "steps":index+2,
            "role":"",
            "activity":0,
            "master_type":1,
            "title":data.title
          }
          this.post_data.push(item)
        })
        this.post_data.push({...this.initial_data_3,steps:this.post_data.length+1})
        this.post_data.push({...this.initial_data_4,steps:this.post_data.length+1})
        this.post_data.push({...this.initial_data_5,steps:this.post_data.length+1})
        this.post_data.push({...this.initial_data_6,steps:this.post_data.length+1})
      } 
    })
    
  }


  updateRole(){
    this.err=false;
    this.opportunity_error=false;
        
    if(this.opportunity_id == "" || this.opportunity_id == undefined){
      this.opportunity_error=true;
      this.err=true;
    }
    this.post_data.map(data=>{
        if(data.role == "" || data.role == undefined){
          data.role_error=true;
          this.err=true;
        }else{
          data.role_error=false;
        }
    })
    if(this.err) return;
    this.load=true;
    // this.post_data.map(data=>{
    //   data.opportunity_id=this.opportunity_id
    // });
    const data={
      "insert":this.post_data,
      "opportunity_id":this.opportunity_id,

    }
    
    this.kyc_service.insertOpportunitySetup(data).subscribe((res:any)=>{
      if(res.status){
        this.load=false;
        this.toast.successToastr(res.response.message,"");
        return
      }
      this.load=false;
      this.toast.warningToastr(res.response.message,"");
    })
  }

}
