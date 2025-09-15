import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-director',
  templateUrl: './delete-director.component.html',
  styleUrls: ['./delete-director.component.css']
})
export class DeleteDirectorComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) {}
  ngOnInit(): void {
  
  }

  confirm() {
    this.activeModal.close('confirm');
  }

  dismiss() {
    this.activeModal.dismiss('cancel');
  }}