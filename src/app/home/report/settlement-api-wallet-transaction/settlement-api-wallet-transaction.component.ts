import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { ToastrService } from '../../../services/toastr.service';
import { FormControl } from '@angular/forms';
import { NbDateService } from "@nebular/theme";
import {  TransactionResponse } from '../../../@model/api_settlement_wallet/TransactionResponse';
@Component({
  selector: 'ngx-settlement-api-wallet-transaction',
  templateUrl: './settlement-api-wallet-transaction.component.html',
  styleUrls: ['./settlement-api-wallet-transaction.component.scss']
})
export class SettlementApiWalletTransactionComponent implements OnInit {
transactions: TransactionResponse ;
  formControl = new FormControl(new Date());
  ngModelDate = new Date();
  selectedTxnType = "";
  selectedTxnStatus;
  selectedTxnPipe;
  frommin: Date;
  frommax: Date;
  tomin: Date;
  tomax: Date;
  today: Date;
  loading: boolean = false;
  constructor(private http : HttpService, private toast: ToastrService, protected dateService: NbDateService<Date>,) { 
    this.frommin = this.dateService.addMonth(this.dateService.today(), -2);
    //this.frommax = this.dateService.addDay(this.min, 15);
    this.frommax = this.dateService.today();
    this.tomin = this.dateService.today();
    this.tomax = this.dateService.today();
    this.today = this.dateService.today();
  }

  ngOnInit(): void {
  }
setMaxdate(e) {
    const eDate = e.getFullYear() + "" + e.getMonth() + "" + e.getDate();
    const tDate =
      this.today.getFullYear() +
      "" +
      this.today.getMonth() +
      "" +
      this.today.getDate();
    this.ngModelDate = e;
    if (eDate == tDate) {
      this.tomax = this.today;
      this.tomin = this.today;
    } else {
      if (parseInt(tDate) - parseInt(eDate) >= 7) {
        this.tomax = this.dateService.addDay(e, 7);
      } else {
        this.tomax = this.today;
      }

      this.tomin = this.dateService.addDay(e, 0);
    }
    console.warn(eDate);
  }

  getWalletReport(){
    let data = {
      startDate: this.formControl.value,
      endDate: this.ngModelDate,
      txnType: this.selectedTxnType,
      type:'transaction'
    };
    this.http.post("api_client/report",data).subscribe((res: TransactionResponse)=>{
      if(res.response){
        this.transactions = res;
      }
    });
  }
}