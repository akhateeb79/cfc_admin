import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { KYCService } from 'src/app/shared/Services/kyc.service';
import { environment } from 'src/environments/environment';
declare const $:any;
@Component({
  selector: 'app-reports-borrower',
  templateUrl: './reports-borrower.component.html',
  styleUrls: ['./reports-borrower.component.css']
})
export class ReportsBorrowerComponent implements OnInit {
  kycList=[];
  delete_data:any={};
  load:boolean=false;
  dataTable:any;
  type:string="3";
  LANG=environment.english_translations;
  constructor(private router:Router,private kycService:KYCService,private toast:ToastrManager) {
    if(this.router.url.split("/")[2] == "inverstors-kyc"){
      this.type="2"
    }
   }

  ngOnInit() {
      this.getKYCList()
  }



  getKYCList(type?:number){
    // this.kycService.getUserKyc(this.type).subscribe((res:any)=>{
    //   if(res.status){
    //     this.kycList=res.response;
    //     if(type){
    //       this.dataTable.destroy();
    //     }
    //     setTimeout(() => {
    //       this.dataTable=$('#example23').DataTable({
    //         dom: 'Bfrtip',
    //         "ordering": false,
    //         responsive: true,
    //         buttons: [
    //             'copy', 'csv', 'excel', 'pdf', 'print'
    //         ]
    //     });
    //     $('.buttons-copy, .buttons-csv, .buttons-print, .buttons-pdf, .buttons-excel').addClass('btn btn-primary mr-1');
    //     }, 100);
    //   }
    // })
    setTimeout(() => {
      this.dataTable=$('#example23').DataTable({
        dom: 'Bfrtip',
        "ordering": false,
        // responsive: true,
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ]
    });
    $('.buttons-copy, .buttons-csv, .buttons-print, .buttons-pdf, .buttons-excel').addClass('btn btn-primary mr-1');
    }, 100);
  }

  edit(data){
    this.router.navigate(["/dashboard/kyc-details"],{queryParams:{id:btoa(btoa(data.id))}})
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
