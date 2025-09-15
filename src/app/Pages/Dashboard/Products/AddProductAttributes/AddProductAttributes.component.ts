import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ProductService } from 'src/app/shared/Services/product.service';
import {Location} from '@angular/common';
import { environment } from 'src/environments/environment';

@Component({
  templateUrl: './AddProductAttributes.component.html',
  styleUrls: ['./AddProductAttributes.component.css']
})
export class AddProductAttributesComponent implements OnInit {
    initialProducts:any={
        "title":"",
        "ar_title":"",
        "subtitle":"",
        "subtitle_ar":"",
        "status": "1",
        "position": "1"
    }
    id:string="";
    attribute_name:string="";
    attribute_name_ar:string="";
    status:string="1";
    position:string="1";
    multiselect:string="1";
    positions:Array<number>=[]
    product_details=[{...this.initialProducts}]
    err:boolean=false;
    load:boolean=false;
    error={
        attribute_name:false,
        attribute_name_ar:false,
    };
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
              this.getProductAttributeDetails();
            }
          }
    )
   }

  ngOnInit() {
    
  }

  addMore(){
    const new_product={...this.initialProducts};
    new_product.position=(this.product_details.length+1).toString();
    this.product_details.push(new_product);
  }

  remove(i){
    this.product_details.splice(i,1)
  }

  errorHandler(){
        if(this.attribute_name == undefined || this.attribute_name == ''){
            this.error.attribute_name=true;
            this.err=true;	
        }
        if(this.attribute_name_ar == undefined || this.attribute_name_ar == ''){
            this.error.attribute_name_ar=true;
            this.err=true;	
        }
        this.product_details.map(data=>{
            if(data.title == "" || data.title == undefined){
                data.title_error=true;
                this.err=true
            }else{
                data.title_error=false;
            }
            if(data.ar_title == "" || data.ar_title == undefined){
                data.ar_title_error=true;
                this.err=true
            }else{
                data.ar_title_error=false;
            }
            if(data.subtitle == "" || data.subtitle == undefined){
                data.subtitle_error=true;
                this.err=true
            }else{
                data.subtitle_error=false;
            }
            if(data.subtitle_ar == "" || data.subtitle_ar == undefined){
                data.subtitle_ar_error=true;
                this.err=true
            }else{
                data.subtitle_ar_error=false;
            }
        })
    
    }

    resetError(){
        this.err=false;
        this.load=false;
        this.error={
            attribute_name:false,
            attribute_name_ar:false,
        }
    }

    addProductAttribute(){
        this.resetError();
        this.errorHandler();
        if(this.err){
            return
        }
        const data:any={
            "title": this.attribute_name,
            "ar_title": this.attribute_name_ar,
            "multiselect": this.multiselect,
            "status": this.status,
            "position": this.position,
            "product_detail":this.product_details
        }
        this.load=true;
        if(this.id){
            data.id=this.id;
            this.update(data)
            return
        }
        this.add(data)
        
    }

    getProductAttributeDetails(){
        this.productService.getProductAttributeDetails(this.id).subscribe((res:any)=>{
            if(res.status){
                this.attribute_name=res.response.title;
                this.attribute_name_ar=res.response.ar_title;
                this.multiselect=res.response.multiselect || "1";
                this.status=res.response.status;
                this.position=res.response.position;
                this.product_details=res.response.product_detail || [{...this.initialProducts}];
              
            }
        })
    }

    add(data){
        this.productService.addProductAttributes(data).subscribe((res:any)=>{
            this.load=false;
            if(res.status){
                this.toastr.successToastr(this.LANG.Attribute_added_successfully);
                this.location.back();
                return
            }
            this.toastr.warningToastr(res.message);

        })
    }

    update(data){
        this.productService.updateProductAttributes(data).subscribe((res:any)=>{
            this.load=false;
            if(res.status){
                this.toastr.successToastr(this.LANG.Attribute_updated_successfully);
                this.location.back();
                return
            }
            this.toastr.warningToastr(res.message);

        })
    }



}
