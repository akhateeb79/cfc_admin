import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import {Location} from '@angular/common';
import { KYCService } from 'src/app/shared/Services/kyc.service';
import { environment } from 'src/environments/environment';
declare const $:any;
@Component({
  templateUrl: './AddEvaluation.component.html',
  styleUrls: ['./AddEvaluation.component.css']
})
export class AddEvaluationComponent implements OnInit {
    initialProducts:any={
        "title":"",
        "ar_title":"",
        "minrange":"",
        "maxrange":"",
        "status": "1",
        "position": "1",
        "evo_cat_id":""
    }
    id:string="";
    title:string="";
    title_ar:string="";
    role_type=[];
    rank_type:string="";
    status:string="1";
    position:string="1";
    rankType=[];
    roleType=[];
    positions:Array<number>=[]
    evaluation_details=[{...this.initialProducts}]
    err:boolean=false;
    cat_err:boolean=false;
    att_err:boolean=false;
    load:boolean=false;
    category_title:string="";
    category_title_ar:string="";
    category_status:string="1";
    category_position:string="1";
    category_minrange:string="";
    category_maxrange:string="";
    show_category_form:boolean=false;
    category_load:boolean=false;
    show_attribute_form:boolean=false;
    attribute_load:boolean=false;
    error={
        title:false,
        title_ar:false,
        role_type:false,
        rank_type:false,
        category_title_ar_error:false,
        category_title_error:false,
        attribute_title:false,
        ar_attribute_title:false,
        maxrange_error:false,
        minrange_error:false,
        att_minrange_error:false,
        att_maxrange_error:false,
    };
    LANG=environment.english_translations;
    
  

  constructor(private kycService:KYCService,private toastr:ToastrManager,private route:ActivatedRoute,private location: Location) {
    for(let i=1;i<= 20;i++){
        this.positions.push(i)
    }
    this.roleType=[
        {id:1,title:"Super Admin"},
        {id:2,title:"Admin"},
        {id:6,title:"Product Manager"},
        {id:7,title:"Parallel Analyser"},
        {id:8,title:"Human Capital Analyser"},
        {id:9,title:"Marketing User"},
        {id:10,title:"Campaign Publisher"},
        
    ]
    this.rankType=[
        {id:1,title:"range"},
        {id:2,title:"Risk "},
        {id:3,title:"Z score "},
        
    ]
    this.route.queryParams
        .subscribe(
          (params: Params) => {
            if(params['id']){
              this.id = atob(atob(params['id']))
              this.getEvaluationDetails();
            }
          }
    )
   }

  ngOnInit() {
    this.loadSelect2()
  }


  loadSelect2(){
    
    $('.js-example-basic-multiple').select2();
    
  }

  addMore(){
    const new_product={...this.initialProducts};
    new_product.position=(this.evaluation_details.length+1).toString();
    this.evaluation_details.push(new_product);
  }

  remove(i){
    this.evaluation_details.splice(i,1)
  }

 

  addCategory(){
    this.clearData();
    this.show_category_form=true;
  }

  clearData(){
    this.category_load=false;
    this.cat_err=false
    this.category_position="1"
    this.category_status="1"
    this.category_title=""
    this.category_title_ar=""
    this.resetError();
  }

  errorHandler(){
        this.role_type=$("#role_type").val() || [];
        if(this.title == undefined || this.title == ''){
            this.error.title=true;
            this.err=true;	
        }
        if(this.title_ar == undefined || this.title_ar == ''){
            this.error.title_ar=true;
            this.err=true;	
        }
        if(this.role_type.length == 0){
            this.error.role_type=true;
            this.err=true;	
        }
        if(this.rank_type == undefined || this.rank_type == ''){
            this.error.rank_type=true;
            this.err=true;	
        }
        if(!this.id){
            this.evaluation_details.map(data=>{
                if(data.title == "" || data.title == undefined){
                    data.category_title_error=true;
                    this.err=true
                }else{
                    data.category_title_error=false;
                }
                if(data.ar_title == "" || data.ar_title == undefined){
                    data.category_title_ar_error=true;
                    this.err=true
                }else{
                    data.category_title_ar_error=false;
                }
    
                if(this.rank_type == "3"){
                    if(data.minrange == "" || data.minrange == undefined){
                        data.minrange_error=true;
                        this.err=true
                    }else{
                        data.minrange_error=false;
                    }if(data.maxrange == "" || data.maxrange == undefined){
                        data.maxrange_error=true;
                        this.err=true
                    }else{
                        data.maxrange_error=false;
                    }
                }
                
        })
        }
    
    }

    resetError(){
        this.err=false;
        this.load=false;
        this.error={
            title:false,
            title_ar:false,
            role_type:false,
            rank_type:false,
            category_title_ar_error:false,
            category_title_error:false,
            attribute_title:false,
            ar_attribute_title:false,
            minrange_error:false,
            maxrange_error:false,
            att_minrange_error:false,
            att_maxrange_error:false,

        }
    }

    addProductAttribute(){
        this.resetError();
        this.errorHandler();
        if(this.err){
            return
        }
        const data:any={
            "title": this.title,
            "ar_title": this.title_ar,
            "status": this.status,
            "position": this.position,
            "evo_category":this.evaluation_details,
            "role_id":this.role_type.toString(),
            "rank_type": this.rank_type,
        }
        this.load=true;
        if(this.id){
            data.id=this.id;
            this.update(data)
            return
        }
        this.add(data)
        
    }

    goBack(){
        this.location.back();
    }

    getEvaluationDetails(){
        this.kycService.getEvaluationDetails(this.id).subscribe((res:any)=>{
            if(res.status){
                this.title=res.response.title;
                this.title_ar=res.response.ar_title;
                this.status=res.response.status;
                this.position=res.response.position;
                this.rank_type=res.response.rank_type.toString();
                this.role_type=res.response.role_id.split(",");
                this.evaluation_details=res.response.category || [];
                $("#role_type").val(this.role_type);
                $("#role_type").trigger('change');
            }
        })
    }

    add(data){
        this.kycService.addEvaluation(data).subscribe((res:any)=>{
            this.load=false;
            if(res.status){
                this.toastr.successToastr(this.LANG.Evaluation_added_successfully);
                this.location.back();
                return
            }
            this.toastr.warningToastr(res.message);

        })
    }

    update(data,type?:number){
        this.kycService.addEvaluation(data).subscribe((res:any)=>{
            this.load=false;
            this.category_load=false;
            this.attribute_load=false;
            if(res.status){
                this.show_attribute_form=false;
                this.show_category_form=false
                this.toastr.successToastr(this.LANG.Attribute_updated_successfully);
                if(!type){
                    this.location.back();
                }
                return
            }
            this.toastr.warningToastr(res.response.message);
        })
    }

    updateAttributeDetails(data){
        this.kycService.updateEvaluationDetails(data).subscribe((res:any)=>{
            this.load=false;
            this.category_load=false;
            this.attribute_load=false;
            if(res.status){
                this.show_attribute_form=false;
                this.show_category_form=false
                this.toastr.successToastr(this.LANG.Attribute_updated_successfully);
                return
            }
            this.toastr.warningToastr(res.response.message);
        })
    }

    addAttributeValue(){
        this.attributeError();
        if(this.att_err){
            return
        }
        
        this.attribute_load=true;
        const index=this.evaluation_details.findIndex(item=>{return item.id == this.initialProducts.evo_cat_id});
        
        if(index != -1){
            this.evaluation_details[index].detail.push(this.initialProducts)
        }
        const post_data={
            "evo_detail":[{
                "evo_id":this.id,
                ...this.initialProducts
            }]
        }
       
        this.attribute_load=true;
        this.updateAttributeDetails(post_data)
    }

    categoryError(){
        this.cat_err=false;
        this.resetError();
        if(this.category_title == undefined || this.category_title == ''){
            this.error.category_title_error=true;
            this.cat_err=true;	
        }
        if(this.category_title_ar == undefined || this.category_title_ar == ''){
            this.error.category_title_ar_error=true;
            this.cat_err=true;	
        }

        if(this.rank_type == "3" || this.rank_type == "1"){
            if(this.category_minrange == "" || this.category_minrange == undefined){
                this.error.minrange_error=true;
                this.err=true
            }
            if(this.category_maxrange == "" || this.category_maxrange == undefined){
                this.error.maxrange_error=true;
                this.err=true
            }
        }
    }

    attributeError(){
        this.att_err=false;
        this.resetError();
        if(this.initialProducts.title == undefined || this.initialProducts.title == ''){
            this.error.attribute_title=true;
            this.att_err=true;	
        }
        if(this.initialProducts.ar_title == undefined || this.initialProducts.ar_title == ''){
            this.error.ar_attribute_title=true;
            this.att_err=true;	
        }

        if(this.rank_type == "3" || this.rank_type == "1"){
            if(this.initialProducts.minrange == "" || this.initialProducts.minrange == undefined){
                this.error.att_minrange_error=true;
                this.err=true
            }
            if(this.initialProducts.maxrange == "" || this.initialProducts.maxrange == undefined){
                this.error.att_maxrange_error=true;
                this.err=true
            }
        }
    }

    addAttributes(){
        this.show_attribute_form=true;
        this.clearAttributeData()
    }

    clearAttributeData(){
        this.attribute_load=false;
        this.att_err=false
        this.initialProducts={
            "title":"",
            "ar_title":"",
            "minrange":"",
            "maxrange":"",
            "status": "1",
            "position": "1",
            "evo_cat_id":""
        }
        this.resetError();
      }

    addProductCategory(){
        this.categoryError();
        if(this.cat_err){
            return
        }
        const data={
            ar_title: this.category_title_ar,
            maxrange: parseInt(this.category_maxrange),
            minrange: parseInt(this.category_minrange),
            position: this.category_position,
            status: this.category_status,
            title: this.category_title,
            detail:[]
        }
        this.category_load=true;
        this.evaluation_details.push(data)
        const post_data:any={
            "title": this.title,
            "ar_title": this.title_ar,
            "status": this.status,
            "position": this.position,
            "evo_category":this.evaluation_details,
            "role_id":this.role_type.toString(),
            "rank_type": this.rank_type,
            "id":this.id

        }
        this.category_load=true;
        this.update(post_data,1)
    }

    onlyNumbers(event:any){
        var keycode = (event.which) ? event.which : event.keyCode;
        if ((keycode < 48 || keycode > 57) && keycode !== 13 || keycode == 46) {
          event.preventDefault();
          return false;
        } 
        return   
    }



}
