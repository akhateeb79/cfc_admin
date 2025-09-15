import {Injectable} from '@angular/core';
// import * as md5 from 'md5'

import { apiServiceComponent } from '../Services/api.service';




@Injectable({providedIn: 'root'})
export class LoginService{
    private url : string = "";

	constructor(private api : apiServiceComponent){
    }

    encryptPassword(password : any ){
		// return md5(password);
        return password;
	}


    userLogin(data:Object){
        this.url = "login";
        
		return this.api.post(this.url, data);
    }

   

    

    
}