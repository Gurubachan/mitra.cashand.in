import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-api-more-view',
  templateUrl: './api-more-view.component.html',
  styleUrls: ['./api-more-view.component.scss']
})
export class ApiMoreViewComponent implements OnInit {

   constructor(private router: Router) {}

  ngOnInit(): void {
  }
  
  loadMoney() {
    this.router.navigateByUrl("services/settlement_loading");
  }
  viewStatement() {
    this.router.navigateByUrl("reports/api-statement");
  }

  viewTransaction() {
    this.router.navigateByUrl("reports/api-transaction");
  }

}
