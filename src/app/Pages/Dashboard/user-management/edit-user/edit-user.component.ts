import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { UsersService } from 'src/app/shared/Services/user.service';
import { UpdatePasswordComponent } from './update-password/update-password.component';
declare const $:any;
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  usersList=[];
   delete_data:any={};
   isLoading:boolean=false;
   dataTable:any;
   LANG=environment.english_translations;
   constructor(private router:Router,private userService:UsersService,private toast:ToastrManager, private modalService: NgbModal) { }
 
   ngOnInit() {
       this.getAllList();
       
   }
   getAllList(type?:number){
   this.isLoading=true;
     this.userService.allUsers().subscribe((res:any)=>{
       if(res.status){
        this.isLoading=false;
         this.usersList=res.response;
         if(type){
           this.dataTable.destroy();
         }
         setTimeout(() => {   
           this.dataTable=$('#example23').DataTable({
             "ordering": false,
             responsive: true,
             
         });
         }, 100);
         
       }
       else {
        this.isLoading=false;
       }
     })
   }
   cancel(){
     this.delete_data={};
   }
  editProgram(data: any): void {

    const modalRef = this.modalService.open(UpdatePasswordComponent);
    modalRef.componentInstance.email = data.email;

    modalRef.result.then(
      (result) => {

        if (result && result.message === 'Password updated successfully') {

        }
      },
      (reason) => {
        console.error('Modal dismissed with reason:', reason);
      }
    );
  }


  // deleteProgram(id: number): void {
  //   const modalRef = this.modalService.open(DeleteDirectorComponent);

  //   modalRef.result.then((result) => {
  //     if (result === 'confirm') {
  //       this.kycService.deletedirector(id).subscribe({
  //         next: (response) => {
  //           this.toast.successToastr(this.LANG.Program_deleted_successfully);

  //           this.fetchProgramData();

  //           this.updatePagination(); 
  //         },
  //         error: (error) => {
  //           this.toast.warningToastr(error.message);

  //           console.error('Error deleting program:', error);
  //         }
  //       });
  //     }
  //   }, (reason) => {
  //     console.error('Deletion canceled:', reason);
  //   });
  // }
}
