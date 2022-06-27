import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from "rxjs";
import { HttpService } from '../../../services/http.service';
import { ToastrService } from '../../../services/toastr.service';
import { NbDateService,  NbDialogService } from "@nebular/theme";
import { map, startWith } from "rxjs/operators";
import { Data, Pagination, Transaction } from '../../../@model/utility/licTransaction';

import { LicReceiptComponent } from '../../component/lic-receipt/lic-receipt.component';

@Component({
  selector: 'ngx-lic',
  templateUrl: './lic.component.html',
  styleUrls: ['./lic.component.scss']
})
export class LicComponent implements OnInit {
  transactions: Pagination;
  loading: Boolean = false;

  formControl = new FormControl(new Date());
  ngModelDate = new Date();
  frommin: Date;
  frommax: Date;
  tomin: Date;
  tomax: Date;
  today: Date;

  requestParam: { startDate: Date; endDate: Date } = null;

  options: string[];
  filteredOptions$: Observable<string[]>;
  inputFormControl: FormControl;
  dialogRef;
  constructor(
    private http: HttpService,
    private toast: ToastrService,
    protected dateService: NbDateService<Date>,
    private dialogService: NbDialogService,
  ) {
    this.frommin = this.dateService.addMonth(this.dateService.today(), -2);
    //this.frommax = this.dateService.addDay(this.min, 15);
    this.frommax = this.dateService.today();
    this.tomin = this.dateService.today();
    this.tomax = this.dateService.today();
    this.today = this.dateService.today();
   }

  ngOnInit(): void {
     this.options = ["Option 1", "Option 2", "Option 3"];
    this.filteredOptions$ = of(this.options);

    this.inputFormControl = new FormControl();

    this.filteredOptions$ = this.inputFormControl.valueChanges.pipe(
      startWith(""),
      map((filterString) => this.filter(filterString))
    );
  }
   private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter((optionValue) =>
      optionValue.toLowerCase().includes(filterValue)
    );
  }
  viewHandle(value: string) {
    return value.toUpperCase();
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
      if (parseInt(tDate) - parseInt(eDate) >= 15) {
        this.tomax = this.dateService.addDay(e, 15);
      } else {
        this.tomax = this.today;
      }

      this.tomin = this.dateService.addDay(e, 0);
    }
    console.warn(eDate);
  }

  goToPage(url: string) {
    this.loading = true;
    let param = url.split("?");
    //console.log(param);
    /* let data = {
      startDate: this.formControl.value,
      endDate: this.ngModelDate,
      type: this.selectedTxnType,
      status: this.selectedTxnStatus,
    }; */
    let endpoint;

    endpoint = "lic/licTransactions";

    this.http.post(endpoint + "?" + param[1], this.requestParam).subscribe(
      (res: Transaction) => {
        if (res.response) {
          this.transactions = res.data;
          console.warn(this.transactions);
          this.loading = false;
        } else {
          this.toast.showToast(res.message, "Lic Payment", "warning");
        }
      },
      (error) => {
        this.toast.showToast(error.error.message, "Lic Payment", "danger");
        console.warn(error.error.message);
        this.loading = false;
      }
    );
  }

  myLic() {
    let data = {
      startDate: this.formControl.value,
      endDate: this.ngModelDate,
    };
    this.requestParam = data;

    this.loading = true;
    this.http.post("lic/transactions", this.requestParam).subscribe(
      (res: Transaction) => {
        if (res.response) {
          this.transactions = res.data;
          console.warn(this.transactions);
          this.loading = false;
        } else {
          this.toast.showToast(res.message, "Lic Pyment", "warning");
          this.loading = false;
        }
      },
      (error) => {
        console.warn(error);
        this.toast.showToast(error.error.message, "Lic Payment", "danger");
        this.loading = false;
      }
    );
  }

  showFile(e){
     this.dialogRef = this.dialogService.open(LicReceiptComponent,{ 
                context: {
                  title: "Lic Payment Report",
                  data: e,
                },
              }
            );
  }

}
