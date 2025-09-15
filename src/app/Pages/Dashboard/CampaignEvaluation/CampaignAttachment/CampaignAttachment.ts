import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { KYCService } from 'src/app/shared/Services/kyc.service';
import { environment } from 'src/environments/environment';
import * as firebase from 'firebase/app';
import 'firebase/storage';
declare const $: any;

@Component({
  templateUrl: './CampaignAttachment.html',
  styleUrls: ['./CampaignAttachment.css']
})
export class CampaignAttachment implements OnInit {
  campaignList: any = [];
  progress: number = 0;
  delete_data: any = {};
  load: boolean = false;
  dataTable: any;
  title: string = "";
  LANG = environment.english_translations;
  user_data: any = {};
  id: string = "";
  myFiles: any = [];

  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required])
  });

  constructor(private router: Router, private route: ActivatedRoute, private kycService: KYCService, private toast: ToastrManager) {
    const user_data = btoa(btoa("user_info"));
    if (localStorage.getItem(user_data) != undefined) {
      this.user_data = JSON.parse(atob(atob(localStorage.getItem(user_data) || '{}')));
    }
  }

  get f() {
    return this.myForm.controls;
  }

  ngOnInit() {
    this.getCampaignList();
  }

  onFileChange(event) {
    const files = event.target.files;

    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      let ext = file.type.split('/').pop().toLowerCase();

      if (
        ext !== 'jpeg' &&
        ext !== 'jpg' &&
        ext !== 'png' &&
        ext !== 'pdf' &&
        file.name.split('.').pop() !== 'docx'
      ) {
        this.toast.warningToastr('', file.name + ' is not a valid file');
        return false;
      }

      const formData = new FormData();
      formData.append('file', file);

      let reader = new FileReader();
      reader.onload = (e: any) => {
        this.myFiles.push({
          image: e.target.result,  // This can be used if you need to show a preview
          file: file,
          extension: ext,
        });
      };

      reader.readAsArrayBuffer(file); // Read the file as binary data
    }
  }

  getCampaignList(type?: number) {
    this.route.queryParams
      .subscribe((params: Params) => {
        if (params['id']) {
          this.id = atob(atob(params['id']));
          this.title = params['title'];

          const data: any = {
            "id": this.id
          }
          this.kycService.getCampaignAttachment(data).subscribe((res: any) => {
            if (res.status) {
              this.campaignList = res.response;
              if (type) {
                this.dataTable.destroy();
              }
              setTimeout(() => {
                this.dataTable = $('#example23').DataTable({
                  "ordering": false,
                  'bDestroy': true,
                  responsive: true,
                });
              }, 100);
            }
          })
        }
      });
  }

  edit(data) {
    this.router.navigate(["/dashboard/campaign-details"], { queryParams: { id: btoa(btoa(data.id)) } });
  }

  showDeleteModal(data) {
    $("#delete").modal("show");
    this.delete_data = data;
  }

  cancel() {
    this.delete_data = {};
  }

  submit() {
    for (let i = 0; i < this.myFiles.length; i++) {
      const formData = new FormData();
      formData.append('id', this.id);
      formData.append('file', this.myFiles[i].file);
      formData.append('ext', this.myFiles[i].extension);

      this.kycService.addCampaignAttachment(formData).then((res: any) => {
        if (res.status) {
          this.ngOnInit();
        }
      });
    }
  }

  delete() {
    this.load = true;
    const data = { "id": this.delete_data.id }
    this.kycService.deleteCampaignattachment(data).subscribe((res: any) => {
      this.load = false;
      if (res.status) {
        $("#delete").modal("hide");
        this.toast.successToastr(this.LANG.Evaluation_deleted_successfully);
        this.ngOnInit();
      } else {
        this.toast.warningToastr(res.response.message);
      }
    });
  }
}
