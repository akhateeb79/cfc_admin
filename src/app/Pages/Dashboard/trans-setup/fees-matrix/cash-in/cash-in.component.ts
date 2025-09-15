import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cash-in',
  templateUrl: './cash-in.component.html',
  styleUrls: ['./cash-in.component.css']
})
export class CashInComponent implements OnInit {

  isEnabled: boolean = false;
  constructor() { }
  toggleVisibility(event: Event): void {
    this.isEnabled = (event.target as HTMLInputElement).checked;
  }
  ngOnInit() {
  }

}
