import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/shared/Services/product.service';
import { environment } from 'src/environments/environment';
declare const $:any;

@Component({
  templateUrl: './productList.component.html',
  styleUrls: ['./productList.component.css']
})
export class ProductListComponent implements OnInit {
  productList=[];
  productAttributes=[];
  LANG=environment.english_translations;

  constructor(private router:Router,private productService:ProductService) { }

  ngOnInit() {
      this.getAttributeList()
  }

  addAttributes(){
    this.router.navigate(["/dashboard/add-products"])
  }

  getProductList(){
    this.productService.getProductList().subscribe((res:any)=>{
      if(res.status){
        this.productList=res.response;
        // setTimeout(() => {   
        //   $('#example23').DataTable({
        //     dom: 'Bfrtip',
        //     "ordering": false,
        //     responsive: true,
        //     buttons: [
        //         'copy', 'csv', 'excel', 'pdf', 'print'
        //     ]
        // });
        // $('.buttons-copy, .buttons-csv, .buttons-print, .buttons-pdf, .buttons-excel').addClass('btn btn-primary mr-1');
        // }, 100);
      }
    })
  }

  getAttributeList(){
    this.productService.getProductAttributes().subscribe((res:any)=>{
      if(res.status){
        this.productAttributes=res.response;
        this.productAttributes.unshift({title:"Instrument with End Client"});
        this.getProductList();
      }
    })
  }

  edit(data){
    this.router.navigate(["/dashboard/add-products"],{queryParams:{id:btoa(btoa(data.id))}})
  }


}
