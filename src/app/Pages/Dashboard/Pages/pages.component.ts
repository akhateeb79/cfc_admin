import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { KYCService } from 'src/app/shared/Services/kyc.service';
import { environment } from 'src/environments/environment';
declare const $:any;
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  pages_list=[];
  delete_data:any={};
  load:boolean=false
  dataTable:any;
  LANG=environment.english_translations;
  constructor(private router:Router,private kycService:KYCService,private toast:ToastrManager) { }

  ngOnInit() {
    this.getPages()
  }

  addKYC(){
    this.router.navigate(["/dashboard/add-pages"])
  }

  getPages(type?:number){
    this.kycService.getPagesList().subscribe((res:any)=>{
      if(res.status){
        this.pages_list=res.response;
        if(type){
          this.dataTable.destroy();
        }
        setTimeout(() => {   
          this.dataTable=$('#example23').DataTable({
            dom: 'Bfrtip',
            "ordering": false,
            responsive: true
           
        });
        $('.buttons-copy, .buttons-csv, .buttons-print, .buttons-pdf, .buttons-excel').addClass('btn btn-primary mr-1');
        }, 100);
      }
    })
  }

  edit(data){
    this.router.navigate(["/dashboard/add-pages"],{queryParams:{id:btoa(btoa(data.id))}})
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
        this.getPages(1)
        return
      }
      this.toast.warningToastr(res.response.message);
    })
  }

}
