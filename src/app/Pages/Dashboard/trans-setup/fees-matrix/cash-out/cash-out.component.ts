import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cash-out',
  templateUrl: './cash-out.component.html',
  styleUrls: ['./cash-out.component.css']
})
export class CashOutComponent implements OnInit {
  isEnabled: boolean = false;
  constructor() { }
  toggleVisibility(event: Event): void {
    this.isEnabled = (event.target as HTMLInputElement).checked;
  }
  ngOnInit() {
  }

}
