import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { KYCService } from 'src/app/shared/Services/kyc.service';
import { environment } from 'src/environments/environment';
declare const $:any;

@Component({
  templateUrl: './EvaluationList.component.html',
  styleUrls: ['./EvaluationList.component.css']
})
export class EvaluationListComponent implements OnInit {
  evaluationList=[];
  delete_data:any={};
  load:boolean=false
  dataTable:any;
  LANG=environment.english_translations;
  constructor(private router:Router,private kycService:KYCService,private toast:ToastrManager) { }

  ngOnInit() {
      this.getEvaluationList()
  }

  addKYC(){
    this.router.navigate(["/dashboard/add-evaluation"])
  }

  getEvaluationList(type?:number){
    this.kycService.getEvaluationList().subscribe((res:any)=>{
      if(res.status){
        this.evaluationList=res.response;
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
    this.router.navigate(["/dashboard/add-evaluation"],{queryParams:{id:btoa(btoa(data.id))}})
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
    this.kycService.deleteEvaluation(data).subscribe((res:any)=>{
      this.load=false
      if(res.status){
      $("#delete").modal("hide");

        this.toast.successToastr(this.LANG.Evaluation_deleted_successfully);
        this.getEvaluationList(1)
        return
      }
      this.toast.warningToastr(res.response.message);
    })
  }



}
