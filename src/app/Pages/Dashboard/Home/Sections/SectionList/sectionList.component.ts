import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { KYCService } from 'src/app/shared/Services/kyc.service';
import { environment } from 'src/environments/environment';
declare const $:any;
@Component({
  selector: 'app-sections',
  templateUrl: './sectionList.component.html',
  styleUrls: ['./sectionList.component.css']
})
export class SectionsComponent implements OnInit {

  sectionList=[];
  delete_data:any={};
  load:boolean=false;
  err:boolean=false;
  dataTable:any;
  LANG=environment.english_translations;
  type:string;
  title:string="";
  title_ar:string="";
  page_loaded=false;
  error={
    title:false,
    title_ar:false,
};
  constructor(private router:Router,private route:ActivatedRoute,private toastr:ToastrManager,private kycService:KYCService,private toast:ToastrManager) {
    this.route.queryParams
        .subscribe(
          (params: Params) => {
            if(params['type']){
              this.page_loaded=false;
              this.type = atob(atob(params['type']));
              this.getsectionList()
            }
          }
    )
   }

  ngOnInit() {
  }

  addSection(){
    this.router.navigate(["/dashboard/add-section"],{queryParams:{type:btoa(btoa(this.type))}})
  }

  getsectionList(){
    this.kycService.getSectionList(this.type).subscribe((res:any)=>{
      if(res.status){
        this.sectionList=res.response;
        this.page_loaded=true;
      }
    })
  }

  edit(data){
    this.router.navigate(["/dashboard/add-section"],{queryParams:{id:btoa(btoa(data.id))}})
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
    this.kycService.deleteSection(data).subscribe((res:any)=>{
      this.load=false
      if(res.status){
      $("#delete").modal("hide");

        this.toast.successToastr(res.response.message);
        this.getsectionList()
        return
      }
      this.toast.warningToastr(res.response.message);
    })
  }


  errorHandler(){
    this.sectionList.map(data=>{
      if(data.title == undefined || data.title == ''){
          this.error.title=true;
          this.err=true;	
      }
      if(data.ar_title == undefined || data.ar_title == ''){
          this.error.title_ar=true;
          this.err=true;	
      }
    })
  
        
       
    
    }
  
    resetError(){
        this.err=false;
        this.load=false;
        this.error={
            title:false,
            title_ar:false,
        }
    }
  
    addSectionHeader(item){
        this.resetError();
        this.errorHandler();
        if(this.err){
            return
        }
        const data:any={
            "title": item.title,
            "ar_title": item.ar_title,
            "type": this.type,
            "flag":1,
            "id":item.id,
            "status":item.status
        }
        this.load=true;
        this.update(data)
        
    }
  
    
  
    update(data){
        this.kycService.updateSection(data).subscribe((res:any)=>{
            this.load=false;
            if(res.status){
                this.toastr.successToastr(res.response.message);
                this.getsectionList();
                return
            }
            this.toastr.warningToastr(res.message);
        })
    }

}
