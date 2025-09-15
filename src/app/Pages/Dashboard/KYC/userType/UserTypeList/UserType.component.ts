import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { KYCService } from 'src/app/shared/Services/kyc.service';
import { environment } from 'src/environments/environment';
declare const $:any;

@Component({
  templateUrl: './UserType.component.html',
  styleUrls: ['./UserType.component.css']
})
export class UserTypeComponent implements OnInit {
  UserTypeList=[];
  delete_data:any={};
  load:boolean=false;
  dataTable:any;
  LANG=environment.english_translations;
  constructor(private router:Router,private kycService:KYCService,private toast:ToastrManager) { }

  ngOnInit() {
      this.getUserTypeList()
  }

  addUserType(){
    this.router.navigate(["/dashboard/add-user-type"])
  }

  getUserTypeList(type?:number){
    this.kycService.getUserTypeList().subscribe((res:any)=>{
      if(res.status){
        this.UserTypeList=res.response.data;
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

  edit(data){
    this.router.navigate(["/dashboard/add-user-type"],{queryParams:{id:btoa(btoa(data.id))}})
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
  
    this.kycService.deleteUserType(this.delete_data.id).subscribe((res:any)=>{
      this.load=false
      if(res.status){
      $("#delete").modal("hide");
        this.toast.successToastr(this.LANG.User_type_deleted_successfully);
        this.getUserTypeList(1)
        return
      }
      this.toast.warningToastr(res.response.message);
    })
  }



}
