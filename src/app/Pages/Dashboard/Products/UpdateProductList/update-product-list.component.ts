import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ProductService } from 'src/app/shared/Services/product.service';
import {Location} from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
declare const $:any;
@Component({
  templateUrl: './update-product-list.component.html',
  styleUrls: ['./update-product-list.component.css'] 
})
export class UpdateProductListComponent implements OnInit {
  
  id:string="";
  productDetails:any={};
  product_name:string="";
  product_name_ar:string="";
  status:string="1";
  position:string="1";
  multiselect:string="1";
  positions:Array<number>=[]
  err:boolean=false;
  load:boolean=false;
  error={
      product_name:false,
      product_name_ar:false,
  };
  productAttributes=[];
  productAttributeDetail=[];
  LANG=environment.english_translations;

  constructor(private productService:ProductService,private toastr:ToastrManager,private route:ActivatedRoute,private location: Location) { 
    for(let i=1;i<= 20;i++){
      this.positions.push(i)
    }
    this.route.queryParams
        .subscribe(
          (params: Params) => {
            if(params['id']){
              this.id = atob(atob(params['id']))
              this.getProductDetails();
            }else{
              this.getAttributeList();
            }
          }
    )
  }

  ngOnInit() {
    
  }

  

  errorHandler(){
        if(this.product_name == undefined || this.product_name == ''){
            this.error.product_name=true;
            this.err=true;	
        }
        if(this.product_name_ar == undefined || this.product_name_ar == ''){
            this.error.product_name_ar=true;
            this.err=true;	
        }
    
    }

    resetError(){
        this.err=false;
        this.load=false;
        this.error={
            product_name:false,
            product_name_ar:false,
        }
    }

    addProduct(){
      this.resetError();
      this.errorHandler();
      if(this.err){
          return
      }
      const data={
        "title": this.product_name,
        "ar_title": this.product_name_ar,
        "status": this.status,
        "position": this.position,
        "product_detail":this.productDetails.product_detail
      }
      this.load=true;
      if(this.id){
        this.update(data);
        return
      }
      this.add(data);
    }

    add(data){
      this.productAttributes.map((data,i)=>{
        if(data.multiselect == 1){
          const id=`#multi${i}-${data.id}`;
          const val=$(id).val() || [];
          if(val.length > 0){
            this.productAttributeDetail.push({
              product_attribute_id:data.id,
              product_detail_id:val.toString(),
              status:1
            })
          }
          return
        }
        const id=`#single${i}-${data.id}` || {};
        const val=$(id).val();
        if(val){
          this.productAttributeDetail.push({
            product_attribute_id:data.id,
            product_detail_id:val,
            status:1
          })
        }
      })
      data.product_detail=this.productAttributeDetail;
      this.productService.addProduct(data).subscribe((res:any)=>{
        this.load=false;
        if(res.status){
            this.toastr.successToastr(this.LANG.Product_added_successfully);
            this.location.back();
            return
        }
        this.toastr.warningToastr(res.message);
    })
    }

    update(data){
      data.id=this.id;  
      this.productService.updateProduct(data).subscribe((res:any)=>{
          this.load=false;
          if(res.status){
              this.toastr.successToastr(this.LANG.Product_updated_successfully);
              this.location.back();
              return
          }
          this.toastr.warningToastr(res.message);

      })
    }

    getProductDetails(){
      this.productService.getProductDetails(this.id).subscribe((res:any)=>{
          if(res.status){
            this.productDetails=res.response;
            this.product_name=res.response.title;
            this.product_name_ar=res.response.ar_title;
            this.getAttributeList();

          }
      })
  }

  getAttributeList(){
    this.productService.getAttributeList().subscribe((res:any)=>{
      if(res.status){
        this.productAttributes=res.response;
        setTimeout(() => {
          this.loadSelect2();
        }, 100);
      }
    })
  }

  loadSelect2(){
    $('.js-example-basic-single').select2({
      placeholder: "Select Attribute",
    });
    $('.js-example-basic-multiple').select2();
    if(this.id){
      this.setDefaultValues()
    }
    $(".multi-id").select2().on('change', (e) => {
      if(this.id){
        this.handleMultiSelect(e.target.id)
      }
    });
    $(".single-id").select2().on('change', (e) => {
      if(this.id){
        this.handleSingleSelect(e.target.id)
      }
     });
  }

  setDefaultValues(){
    this.productAttributes.map((data,i)=>{
      if(data.multiselect == 1){
        const index=this.productDetails.product_detail.findIndex(item=>{return item.product_attribute_id == data.id});
        let value=[];
        if(index != -1){
          if(this.productDetails.product_detail[index].product_attribute_detail_id){
            value=this.productDetails.product_detail[index].product_attribute_detail_id.split(",")
          }
        }
        const id=`#multi${i}-${data.id}`;
        $(id).val(value);
        $(id).trigger('change');
        return
      }
      const index=this.productDetails.product_detail.findIndex(item=>{return item.product_attribute_id == data.id});
      let value;
      if(index != -1){
        if(this.productDetails.product_detail[index].product_detail_id){
          value=this.productDetails.product_detail[index].product_detail_id
        }
      }
      const id=`#single${i}-${data.id}`;
      $(id).val(value);
      $(id).trigger('change');
    })
  }
  
  handleMultiSelect(id){
    const values=$(`#${id}`).val() || []  ;
    const attribute_id=id.split("-")[1];
    if(this.id){
      const index=this.productDetails.product_detail.findIndex(data=>{return data.product_attribute_id == attribute_id});
      if(index != -1){
        this.productDetails.product_detail[index].product_attribute_detail_id=values.toString();
        return
      }
      this.productDetails.product_detail.push({product_attribute_id:attribute_id,product_attribute_detail_id:values.toString()});
      return
    }
  }

  handleSingleSelect(id){
    const values=$(`#${id}`).val() || "";
    const attribute_id=id.split("-")[1];
    const index=this.productDetails.product_detail.findIndex(data=>{return data.product_attribute_id == attribute_id});
    if(index != -1){
      this.productDetails.product_detail[index].product_detail_id=values;
      return
    }
  }

  

}
