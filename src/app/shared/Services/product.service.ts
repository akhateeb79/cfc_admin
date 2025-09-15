import {Injectable} from '@angular/core';

import { apiServiceComponent } from '../Services/api.service';




@Injectable({providedIn: 'root'})
export class ProductService{
    private url : string = "";

	constructor(private api : apiServiceComponent){
    }

    getProductList(){
        this.url = "product_list";
        let query="";
		return this.api.get(this.url, query);
    }


    getProductAttributes(){
        this.url = "list_product_attribute";
        let query="";
		return this.api.get(this.url, query);
    }

    deleteProductAttributes(data){
        this.url = "delete_product_attribute";
		return this.api.post(this.url, data);
    }

    getProductAttributeDetails(id){
        this.url = `get_by_id/${id}`;
        let query="";
		return this.api.get(this.url, query);
    }

    getProductDetails(id){
        this.url = `get_product_by_id/${id}`;
        let query="";
		return this.api.get(this.url, query);
    }

    getAttributeList(){
        this.url = `product_attribute_list`;
        let query="";
		return this.api.get(this.url, query);
    }






    addProductAttributes(data:Object){
        this.url = "add_product_attribute";
		return this.api.post(this.url, data);
    }

    updateProductAttributes(data:Object){
        this.url = "update_product_attribute";
		return this.api.post(this.url, data);
    }

    addProduct(data:Object){
        this.url = "add_product";
		return this.api.post(this.url, data);
    }


    updateProduct(data:Object){
        this.url = "update_product";
		return this.api.post(this.url, data);
    }

    getLoanList(){
        this.url = "loan_list";
        let query="";
		return this.api.get(this.url, query);
    }

    addLoan(data){
        this.url = "loan_insert";
		return this.api.post(this.url, data);
    }

    updateLoan(data){
        this.url = "loan_update";
		return this.api.post(this.url, data);
    }

    getLoanTypeList(){
        this.url = "loantype_list";
        let query="";
		return this.api.get(this.url, query);
    }


    getIRCalculationList(){
        this.url = "intrest_calculation_list";
        let query="";
		return this.api.get(this.url, query);
    }

    getIRFrequencyList(){
        this.url = "accruedinterest_list";
        let query="";
		return this.api.get(this.url, query);
    }

    getIRChargedList(){
        this.url = "intrest_rate_charged_list";
        let query="";
		return this.api.get(this.url, query);
    }

    getGracePeriodList(){
        this.url = "graceperiod_list";
        let query="";
		return this.api.get(this.url, query);
    }

    getPaymentIntervalsList(){
        this.url = "payamentintervalmethod_list";
        let query="";
		return this.api.get(this.url, query);
    }

    addPaymentInfo(data){
        this.url = "repaymentscheduling_insert";
		return this.api.post(this.url, data);
    }

    applyLoan(data){
        this.url = "applyloan";
		return this.api.post(this.url, data);
    }

    getStatement(data){
        this.url = "get_statements";
		return this.api.post(this.url, data);
    }

    getLoadDetails(id){
        this.url = "loanget_by_id/"+id;
		return this.api.get(this.url, "");
    }

    getInvestorList(data){
        this.url = "get_invester_list";
		return this.api.post(this.url, data);
    }


    changeDate(data:any,id:any){
        // this.url ="campaign_update_closedate"
        this.url =`campaign_update_closedate/${id}`
        return this.api.postHeader(this.url,data)
    }



}
