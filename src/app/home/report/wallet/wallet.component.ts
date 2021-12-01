import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { NbDateService } from "@nebular/theme";
import { Observable, of } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { HttpService } from "../../../services/http.service";

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
  selectedTxnType;
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

  constructor(
    private http: HttpService,
    protected dateService: NbDateService<Date>,
    private cd: ChangeDetectorRef
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

  wallet: any = {
    current_page: Number,
    first_page_url: String,
    from: Number,
    to: Number,
    next_page_url: String,
    path: String,
    per_page: Number,
    prev_page_url: String,
    data: <any>[],
  };
  getWalletReport() {
    this.loading = true;
    this.http.post("wallet/statement", null).subscribe(
      (result) => {
        if (result.response) {
          console.log(result);
          this.wallet = result.data;
          this.loading = false;
          this.cd.detectChanges();
        } else {
        }
      },
      (error) => {
        console.log(error.error);
        this.loading = false;
      }
    );
  }

  goToPage(url: string) {
    this.loading = true;
    let param = url.split("?");
    console.log(param);
    this.http
      .post("wallet/statement" + "?" + param[1], null)
      .subscribe((res) => {
        if (res.response) {
          this.wallet = res.data;
          this.loading = false;
        }
        this.cd.detectChanges();
      });
  }
}
