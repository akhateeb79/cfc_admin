import {Injectable,EventEmitter} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})

export class SharedService {

    private otpVerified: boolean = false;

    private isLoggedIn:boolean=false; 
    
    private otpVerifiedSubject = new BehaviorSubject<boolean>(this.otpVerified);
   
    private loggedIn = new BehaviorSubject(this.isLoggedIn);

    
    currentUser =this.loggedIn.asObservable();
    otpVerified$ = this.otpVerifiedSubject.asObservable();


    logoutUser = new EventEmitter();




    
    changeUser(user:boolean){
        this.loggedIn.next(user);
    }

setOtpVerified(status: boolean) {
    this.otpVerifiedSubject.next(status); // Update the status
}

    // Check if OTP is verified
    isOtpVerified(): boolean {
        return this.otpVerifiedSubject.getValue();
      }
    

    logout(user: boolean) {
        this.logoutUser.emit(user);
        this.otpVerifiedSubject.next(false);
    }
 
        

    
}