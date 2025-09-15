import { Component, Input, OnInit } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { KYCService } from 'src/app/shared/Services/kyc.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-borrower-model-note',
  templateUrl: './borrower-model-note.component.html',
  styleUrls: ['./borrower-model-note.component.css']
})
export class BorrowerModelNoteComponent implements OnInit {
  notes: any;
  note: string = '';
  Admin_name :string ;
  Admin_Id :any;
  @Input() id!: number
  @Input() type!: any;
  LANG=environment.english_translations;
  constructor(public activeModal: NgbActiveModal , private KYCService:KYCService, private toast: ToastrManager) {}
  ngOnInit(): void {
    this.Admin_name = localStorage.getItem('name');

    this.Admin_Id= localStorage.getItem('user-id')
    this.fetchNotes()

  
  }

  confirm() {
    this.activeModal.close('confirm');
  }

  dismiss() {
    this.activeModal.dismiss('cancel');
  }



  fetchNotes() {
    this.KYCService.getNotes().subscribe({
      next: (data:any) => {
        if (data?.status && data.response?.status === 'Success') {
          this.notes = data.response.response || [];
        } else {
          console.warn('Unexpected response format or status:', data);
        }
      },
      error: (error) => {
        console.error('Error fetching notes:', error);
      }
    });
  }
  

  saveNote() {
    this.KYCService.insertNote(this.Admin_Id, this.Admin_name, this.note,this.type, this.id)
      .subscribe(
        (response) => {
          this.fetchNotes()
          this.toast.successToastr(this.LANG.Note_add_sucssfully);
          this.note = '';
        },
        (error) => {
          this.toast.errorToastr(this.LANG.Something_went_wrong_Please_try_again_later);
        }
      );
  }


}



