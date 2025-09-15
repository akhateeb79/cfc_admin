import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ProductService } from 'src/app/shared/Services/product.service';
import { environment } from 'src/environments/environment';
declare const $:any;

@Component({
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html',
  styleUrls: ['./loan-list.component.css']
})
export class LoanListComponent implements OnInit {
  loanList=[];
  delete_data:any={};
  load:boolean=false
  dataTable:any;
  LANG=environment.english_translations;
  constructor(private router:Router,private productService:ProductService,private toast:ToastrManager) { }

  ngOnInit() {
      this.getLoanList()
  }

  addKYC(){
    this.router.navigate(["/dashboard/add-loan"])
  }

  getLoanList(type?:number){
    this.productService.getLoanList().subscribe((res:any)=>{
      if(res.status){
        this.loanList=res.response;
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
    this.router.navigate(["/dashboard/add-loan"],{queryParams:{id:btoa(btoa(data.id))}})
  }

  // showDeleteModal(data){
  //   $("#delete").modal("show");
  //   this.delete_data=data;
  // }

  // cancel(){
  //   this.delete_data={};
  // }

  // delete(){
  //   this.load=true;
  //   const data={"id":this.delete_data.id}
  //   this.kycService.deleteEvaluation(data).subscribe((res:any)=>{
  //     this.load=false
  //     if(res.status){
  //     $("#delete").modal("hide");

  //       this.toast.successToastr("EValuation deleted successfully");
  //       this.getLoanList(1)
  //       return
  //     }
  //     this.toast.warningToastr(res.response.message);
  //   })
  // }

}
