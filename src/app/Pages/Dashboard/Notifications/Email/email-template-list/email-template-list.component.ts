import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { UsersService } from 'src/app/shared/Services/user.service';
import { environment } from 'src/environments/environment';
declare const $:any;
@Component({
  selector: 'app-email-template-list',
  templateUrl: './email-template-list.component.html',
  styleUrls: ['./email-template-list.component.css']
})
export class EmailTemplateListComponent implements OnInit {

  notificationList=[];
  delete_data:any={};
  load:boolean=false;
  dataTable:any;
  LANG=environment.english_translations;

  constructor(private router:Router,private userService:UsersService,private toast:ToastrManager) { }

  ngOnInit() {
      this.getNotificationList()
  }

  addAdmin(){
    this.router.navigate(["/dashboard/add-email-templates"])
  }

  getNotificationList(type?:number){
    this.userService.templatesList().subscribe((res:any)=>{
      if(res.status){
        this.notificationList=res.response.filter(data=> {return data.type == "1"});
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
    this.router.navigate(["/dashboard/add-email-templates"],{queryParams:{id:btoa(btoa(data.id))}})
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
