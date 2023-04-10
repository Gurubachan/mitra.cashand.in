import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { NbDateService } from "@nebular/theme";
import { Observable, of } from "rxjs";
import { map, startWith } from 'rxjs/operators';
import { environment } from "../../../../environments/environment";
import { Data } from "../../../@model/athenticate/auth";
import { CostumehttpService } from "../../../services/costumehttp.service";
import { HttpService } from "../../../services/http.service";
import { ToastrService } from "../../../services/toastr.service";
import { PublicApiCallService } from "../../../services/public-api-call.service";

@Component({
  selector: "ngx-aeps",
  templateUrl: "./aeps.component.html",
  styleUrls: ["./aeps.component.scss"],
})
export class AepsComponent implements OnInit {
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
  permiteMISRole=[9,10,14,15];
  user:any=null;
  options: string[];
  filteredOptions$: Observable<string[]>;
  inputFormControl: FormControl;

  requestParam: { startDate: Date; endDate: Date } = null;
  constructor(
    private http: HttpService,
    protected dateService: NbDateService<Date>,
    private toast: ToastrService,
    private commonApi: PublicApiCallService
  ) {
    this.frommin = this.dateService.addMonth(this.dateService.today(), -2);
    //this.frommax = this.dateService.addDay(this.min, 15);
    this.frommax = this.dateService.today();
    this.tomin = this.dateService.today();
    this.tomax = this.dateService.today();
    this.today = this.dateService.today();
  }

  ngOnInit(): void {
    this.getUserData();
    
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
  fetchTransaction() {
    this.loading = true;
    let data = {
      startDate: this.formControl.value,
      endDate: this.ngModelDate,
      type: this.selectedTxnType,
      status: this.selectedTxnStatus,
      userId: null,
    };


    if(this.inputFormControl.value !=null && this.inputFormControl.value.length > 10 ){
      console.warn(this.inputFormControl.value);
      let contact=this.inputFormControl.value.split("-");
      data.userId= contact[0];
    }else{
      
        data.userId=null;
      
      
    }


    // console.log(data);
    let url;

    this.requestParam = data;
      url = "rbp/transaction";
      this.fetchAeps(url);
   
    
  }

  fetchAeps(url){
    this.http.post(url, this.requestParam).subscribe(
      (resulte) => {
        if (resulte.response) {
          this.transactions = resulte.data;
          this.loading = false;
        }else{
          this.toast.showToast(resulte.message, "AEPS Transaction", "warning");
          this.loading = false;
        }
      },
      (err) => {
        console.log(err);
        this.toast.showToast(err.error.message, "AEPS Transaction", "danger");
        this.loading = false;
      }
    );
  }
 

  goToPage(url: string) {
    this.loading = true;
    let param = url.split("?");
    //console.log(param);
    
    let endpoint;
   
      endpoint = "rbp/transaction";
   
    this.http.post(endpoint + "?" + param[1], this.requestParam).subscribe((res) => {
      if (res.response) {
        this.transactions = res.data;
        this.loading = false;
      }else{
          this.toast.showToast(res.message, "AEPS Transaction", "warning");
          this.loading = false;
        }
    });
  }

   filterUser(e){
 
 
if (e != null && e.length >= 4 && e.length<=10){
    this.commonApi.filterUser(e).then((userList)=>{
      console.warn("Filter", userList);
      this.options=userList;
    });
  }
  }

  getUserData() {
    this.user = JSON.parse(window.atob(localStorage.getItem("user")));
    console.log(this.user);
  }
}
