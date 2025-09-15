import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { KYCService } from 'src/app/shared/Services/kyc.service';
import { environment } from 'src/environments/environment';
declare const $:any;

@Component({
  templateUrl: './KYCList.component.html',
  styleUrls: ['./KYCList.component.css']
})
export class KYCListComponent implements OnInit {
  kycList=[];
  delete_data:any={};
  load:boolean=false;
  dataTable:any;
  LANG=environment.english_translations;
  constructor(private router:Router,private kycService:KYCService,private toast:ToastrManager) { }

  ngOnInit() {
      this.getKYCList()
  }

  addKYC(){
    this.router.navigate(["/dashboard/add-kyc"])
  }

  getKYCList(type?:number){
    this.kycService.getKYCList().subscribe((res:any)=>{
      if(res.status){
        this.kycList=res.response;
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
    this.router.navigate(["/dashboard/add-kyc"],{queryParams:{id:btoa(btoa(data.id))}})
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
    this.kycService.deleteKYC(data).subscribe((res:any)=>{
      this.load=false
      if(res.status){
      $("#delete").modal("hide");

        this.toast.successToastr(this.LANG.KYC_deleted_successfully);
        this.getKYCList(1)
        return
      }
      this.toast.warningToastr(res.response.message);
    })
  }



}
