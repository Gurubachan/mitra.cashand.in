import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from "@angular/forms";
import { NbDateService } from "@nebular/theme";
import { Observable, of } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { WalletRequest } from "../../../@model/wallet/walletRequest";
import { Data, WalletResponse } from "../../../@model/wallet/walletResponse";
import { HttpService } from "../../../services/http.service";
import { PublicApiCallService } from "../../../services/public-api-call.service";

@Component({
  selector: "ngx-wallet",
  templateUrl: "./wallet.component.html",
  styleUrls: ["./wallet.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletComponent implements OnInit {
  transactions: any;
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

  options: string[];
  filteredOptions$: Observable<string[]>;
  inputFormControl: FormControl;

  searchData: WalletRequest;
  constructor(
    private http: HttpService,
    protected dateService: NbDateService<Date>,
    private cd: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private apiCall: PublicApiCallService
  ) {
    this.frommin = this.dateService.addMonth(this.dateService.today(), -2);
    //this.frommax = this.dateService.addDay(this.min, 15);
    this.frommax = this.dateService.today();
    this.tomin = this.dateService.today();
    this.tomax = this.dateService.today();
    this.today = this.dateService.today();
  }

  ngOnInit(): void {

    this.options = [];

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

  wallet: Data;

  getWalletReport() {
    this.loading = true;
    let data = {
      fromDate: this.formControl.value,
      toDate: this.ngModelDate,
      userId: null,
      txnType: this.selectedTxnType,
    };
    this.searchData = data;
    console.warn(this.searchData);
    this.http.post("wallet/statement", this.searchData).subscribe(
      (result: WalletResponse) => {
        if (result.response) {
          console.log(result);
          this.wallet = result.data;
          this.loading = false;
          this.cd.detectChanges();
        } else {
          this.loading = false;
        }
      },
      (error) => {
        console.log(error.error.message);
        this.loading = false;
        this.cd.detectChanges();
      }
    );
  }

  goToPage(url: string) {
    this.loading = true;
    let param = url.split("?");
    console.log(param);
    this.http
      .post("wallet/statement" + "?" + param[1], this.searchData)
      .subscribe((res: WalletResponse) => {
        if (res.response) {
          this.wallet = res.data;
          this.loading = false;
        }
        this.cd.detectChanges();
      });
  }

  /*Get user role from local storage*/

  filterUser(e){

    if (e != null && e.length >= 3){
      this.http.post('admin/filterUser',{value:e}).subscribe((result) => {
        console.log(result)
      });
     /*  let result=this.apiCall.getRetailer(e);
      console.log(result) */
     
    }

  }
  
}
