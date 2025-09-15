import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { UsersService } from 'src/app/shared/Services/user.service';
import { environment } from 'src/environments/environment';
declare const $:any;
@Component({
  selector: 'app-admin-ip-log',
  templateUrl: './admin-ip-log.component.html',
  styleUrls: ['./admin-ip-log.component.css']
})
export class AdminIpLogComponent implements OnInit {

  adminList=[];
  delete_data:any={};
  load:boolean=false;
  dataTable:any;
  LANG=environment.english_translations;
  constructor(private router:Router,private userService:UsersService,private toast:ToastrManager) { }

  ngOnInit() {
    this.getAdminList()
  }

  addAdmin(){
    this.router.navigate(["/dashboard/add-admin-ip"])
  }

  getAdminList(type?:number){
    this.userService.adminIpLogList().subscribe((res:any)=>{
      if(res.status){
        this.adminList=res.response;
        if(type){
          this.dataTable.destroy();
        }
        setTimeout(() => {   
          this.dataTable=$('#example23').DataTable({
            "ordering": false,
            responsive: true,
            
        });
        }, 100);
        
      }
    })
  }

  edit(data){
    this.router.navigate(["/dashboard/add-info-type"],{queryParams:{id:btoa(btoa(data.id))}})
  }


  showDeleteModal(data){
    $("#delete").modal("show");
    this.delete_data=data;
  }

  cancel(){
    this.delete_data={};
  }

  // delete(){
  //   this.load=true;
  //   const data={"id":this.delete_data.id}
  //   this.userService.deleteInfoType(data).subscribe((res:any)=>{
  //     this.load=false
  //     if(res.status){
  //     $("#delete").modal("hide");
  //       this.toast.successToastr("EValuation deleted successfully");
  //       this.getInfoTypeList(1)
  //       return
  //     }
  //     this.toast.warningToastr(res.response.message);
  //   })
  // }

}
