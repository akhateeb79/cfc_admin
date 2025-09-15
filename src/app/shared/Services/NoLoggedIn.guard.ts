import { Injectable } from '@angular/core';
import { Router , CanActivate } from '@angular/router';
import { SharedService } from './shared.service';

@Injectable({providedIn: 'root'})
export class noLoggedIn implements CanActivate {
    public logged_in:boolean=false;
    public isOtpVerified:boolean=false;

    constructor(private router: Router,private shared:SharedService) {
        this.shared.currentUser.subscribe(user=>this.logged_in=user);
        if (localStorage.getItem('ice-web-dashboard')) {
            this.logged_in=true;
        }

        this.shared.otpVerified$.subscribe((status) => {
            this.isOtpVerified = status; // Update the property
          });
    }

    canActivate() {
        if (this.logged_in && this.isOtpVerified) { 
            this.router.navigate(['/dashboard'])
            return true;
        }
        return true;
    }
}
