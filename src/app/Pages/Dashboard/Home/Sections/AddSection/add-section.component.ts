import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import {Location} from '@angular/common';
import { KYCService } from 'src/app/shared/Services/kyc.service';
import { environment } from 'src/environments/environment';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { DomSanitizer } from '@angular/platform-browser';

declare const $:any;

@Component({
  selector: 'app-add-section',
  templateUrl: './add-section.component.html',
  styleUrls: ['./add-section.component.css']
})
export class AddSectionComponent implements OnInit {

  id:string="";
  title:string="";
  title_ar:string="";
  description:string="";
  ar_description:string="";
  status:string="1";
  type:string="1";
  err:boolean=false;
  load:boolean=false;
  image:any;
  ar_image:any;
  image_file:any={};
  ar_image_file:any={};
  progress:number;
  ar_progress:number;
  error={
      title:false,
      title_ar:false,
      description:false,
      ar_description:false,
      image:false,
      ar_image:false,
  };
  LANG=environment.english_translations;
  image_selected:boolean=false;
  ar_image_selected:boolean=false;


constructor(private kycService:KYCService,private toastr:ToastrManager,private route:ActivatedRoute,private location: Location,private sanitization:DomSanitizer) {
  this.route.queryParams
      .subscribe(
        (params: Params) => {
          if(params['id']){
            this.id = atob(atob(params['id']))
            this.getSectionDetails();
          }
          if(params['type']){
            this.type = atob(atob(params['type']))
          }
        }
  )
 }

ngOnInit() {
  $('#editor').summernote({
    height: 200,
  });
  $('#editor1').summernote({
    height: 200,
  });
}

showFileInput(){
  const fileInput=document.getElementById("fileInput") as HTMLInputElement;
  fileInput.click()
}

changeImage(event:any,type?:number) {
  let file = event.target.files[0];
  let ext=file.type.split('/').pop().toLowerCase();
  if(this.type=="0"){
    if(ext !== "mp4"){
      this.toastr.warningToastr("",file.name + "is not a valid file") 
      return false
    }
  }
  if(this.type != "0"){
    if(ext !== "jpeg" && ext !== "jpg" && ext !== "png" && file.name.split(".").pop().toLowerCase() !== "svg"){
        this.toastr.warningToastr("",file.name + "is not a valid file") 
        return false
    }
  }
  if (file) {
      let reader = new FileReader();
      reader.onload = (e: any) => {
        // this.image=e.target.result;
        if(type){
          this.ar_image = this.sanitization.bypassSecurityTrustUrl(e.target.result);
          this.ar_image_file=file
          this.ar_image_selected=true;
        }else{
          this.image = this.sanitization.bypassSecurityTrustUrl(e.target.result);
          this.image_file=file
          this.image_selected=true;
        }
        // this.uploadImage(data)
      }
      reader.readAsDataURL(file);
      if(this.type == "0" && type){
        this.ar_image = (<FileReader>event.target).result;
      }else if(this.type == "0" && !type){
        this.image = (<FileReader>event.target).result;
      }
  }
  return
}

uploadImage(data:any,type?:number) {
  var n = Date.now();
  var fileName = this.image_file.name;
  var path = fileName + n
  const filePath = `Kyc/${path}`;
  this.load=true;
  const uploadTask =
  firebase.storage().ref().child(`${filePath}`).put(this.image_file);
  uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      snapshot => {
      const progress = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          this.progress = progress
      },
      error => console.log(error),
      async () => {
      await uploadTask.snapshot.ref.getDownloadURL().then(res => {
          this.image=res;
          data.image=res;
          if(type){
            this.uploadARImage(data);
            return
          }
          if(this.id){
            this.update(data)
            return
          }
          this.add(data);
      });
      }
  );
}

uploadARImage(data:any) {
  var n = Date.now();
  var fileName = this.ar_image_file.name;
  var path = fileName + n
  const filePath = `Kyc/${path}`;
  this.load=true;
  const uploadTask =
  firebase.storage().ref().child(`${filePath}`).put(this.ar_image_file);
  uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      snapshot => {
      const progress = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          this.ar_progress = progress
      },
      error => console.log(error),
      async () => {
      await uploadTask.snapshot.ref.getDownloadURL().then(res => {
          this.ar_image=res;
          data.ar_image=res;
          if(this.id){
            this.update(data)
            return
          }
          this.add(data);
      });
      }
  );
}



  errorHandler(){
  const description=$("#editor").val();
  const ar_description=$("#editor1").val();
      if(this.title == undefined || this.title == ''){
          this.error.title=true;
          this.err=true;	
      }
      if(this.title_ar == undefined || this.title_ar == ''){
          this.error.title_ar=true;
          this.err=true;	
      }
      if(description == undefined || description == ''){
        this.error.description=true;
        this.err=true;	
      }

      if(ar_description == undefined || ar_description == ''){
        this.error.ar_description=true;
        this.err=true;	 
      }

      
     
  
  }

  resetError(){
      this.err=false;
      this.load=false;
      this.error={
          title:false,
          title_ar:false,
          description:false,
          ar_description:false,
          image:false,
          ar_image:false,
      }
  }

  addSection(){
      this.resetError();
      this.errorHandler();
      if(this.err){
          return
      }
      const description=$("#editor").val();
      const ar_description=$("#editor1").val();
      const data:any={
          "title": this.title,
          "ar_title": this.title_ar,
          "description": description,
          "ar_description": ar_description,
          "status": this.status,
          "type": this.type,
          "image": this.image,
          "ar_image":this.ar_image
      }
      this.load=true;
      if(this.image_selected && !this.ar_image_selected){
          data.id=this.id;
          this.uploadImage(data)
          return
      }
      if(this.image_selected && this.ar_image_selected){
          data.id=this.id;
          this.uploadImage(data,1)
          return
      }
      if(this.ar_image_selected){
        data.id=this.id;
        this.uploadARImage(data)
        return
      }
      if(this.id){
        data.id=this.id;
        this.update(data)
        return
      }
      this.add(data)
      
  }

  getSectionDetails(){
      this.kycService.getSectionDetails(this.id).subscribe((res:any)=>{
          if(res.status){
              this.title=res.response.title;
              this.title_ar=res.response.ar_title;
              this.description=res.response.description;
              this.ar_description=res.response.ar_description;
              this.status=res.response.status;
              this.image=res.response.image; 
              this.ar_image=res.response.ar_image; 
              this.type=res.response.type.toString();
              $('#editor').summernote('code', this.description);
              $('#editor1').summernote('code', this.ar_description);
          }
      })
  }

  add(data){
      this.kycService.insertSection(data).subscribe((res:any)=>{
          this.load=false;
          if(res.status){
              this.toastr.successToastr(res.response.message);
              this.location.back();
              return
          }
          this.toastr.warningToastr(res.message);

      })
  }

  update(data){
      this.kycService.updateSection(data).subscribe((res:any)=>{
          this.load=false;
          if(res.status){
              this.toastr.successToastr(res.response.message);
              this.location.back();
              return
          }
          this.toastr.warningToastr(res.message);
      })
  }


}
