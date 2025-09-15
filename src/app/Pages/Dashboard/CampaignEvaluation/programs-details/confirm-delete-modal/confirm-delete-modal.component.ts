import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-delete-modal',
  templateUrl: './confirm-delete-modal.component.html',
  styleUrls: ['./confirm-delete-modal.component.css']
})
export class ConfirmDeleteModalComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) {}
  ngOnInit(): void {
  
  }

  confirm() {
    this.activeModal.close('confirm');
  }

  dismiss() {
    this.activeModal.dismiss('cancel');
  }}