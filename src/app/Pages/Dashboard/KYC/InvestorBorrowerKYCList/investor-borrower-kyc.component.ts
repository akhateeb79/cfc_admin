


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { KYCService } from 'src/app/shared/Services/kyc.service';
import { environment } from 'src/environments/environment';
import { BorrowerModelNoteComponent } from './reports-borrower/borrower-model-note/borrower-model-note.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
declare const $:any;

@Component({
  templateUrl: './investor-borrower-kyc.component.html',
  styleUrls: ['./investor-borrower-kyc.component.css']
})
export class InvestorBorrowerKYCComponent implements OnInit {

  kycList=[];
  delete_data:any={};
  load:boolean=false;
  dataTable:any;
  type:string="3";
  LANG=environment.english_translations;
  constructor(private router:Router,private kycService:KYCService,private toast:ToastrManager,private modalService: NgbModal) {
    if(this.router.url.split("/")[2] == "inverstors-kyc"){
      this.type="2"
    }
   }

  ngOnInit() {
      this.getKYCList()
  }



  getKYCList(type?:number){
    this.kycService.getUserKyc(this.type).subscribe((res:any)=>{
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


 openModal(id: number) {
  const modalRef = this.modalService.open(BorrowerModelNoteComponent);
  
  // Pass the type property to the modal component
  modalRef.componentInstance.type = this.type;
  modalRef.componentInstance.id = id;

  modalRef.result.then((result) => {
    if (result === 'confirm') {
      // Your confirmation logic here
    }
  });
}

}


