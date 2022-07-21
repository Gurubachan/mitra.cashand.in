import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { HttpService } from '../../../services/http.service';
import { ToastrService } from '../../../services/toastr.service';
import { NbDateService,  NbDialogService } from "@nebular/theme";
import { map, startWith } from 'rxjs/operators';
import { Data, MatmTransaction } from '../../../@model/matm/matmTransaction';
@Component({
  selector: 'ngx-matm',
  templateUrl: './matm.component.html',
  styleUrls: ['./matm.component.scss']
})
export class MatmComponent implements OnInit {

    //transactions: Pagination;
    transactions: Data;
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

  

    endpoint = "atm/transaction";
    user:any=null;
    permiteMISRole=[9,10,14,15];
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
    

    this.http.post(this.endpoint + "?" + param[1], this.requestParam).subscribe(
      (res: MatmTransaction) => {

        if (res.response) {
          this.transactions = res.data;
          console.warn(this.transactions);
          this.loading = false;
        } else {
          this.toast.showToast(res.message, "MATM Transaction", "warning");
        }
      },
      (error) => {
        this.toast.showToast(error.error.message, "MATM Transaction", "danger");
        console.warn(error.error.message);
        this.loading = false;
      }
    );
  }

  myTransaction() {
    let data = {
      startDate: this.formControl.value,
      endDate: this.ngModelDate,
      userId: null,
    };
    if(this.inputFormControl.value !=null && this.inputFormControl.value.length > 10 ){
      console.warn(this.inputFormControl.value);
      let contact=this.inputFormControl.value.split("-");
      data.userId= contact[1];
    }else{
      data.userId=null;
    }
    this.requestParam = data;

    this.loading = true;
    this.http.post(this.endpoint, this.requestParam).subscribe(
      (res: any) => {
        if (res.response) {
          this.transactions = res.data;
          console.warn(this.transactions);
          this.loading = false;
        } else {
          this.toast.showToast(res.message, "MATM Transaction", "warning");
          this.loading = false;
        }
      },
      (error) => {
        console.warn(error);
        this.toast.showToast(error.error.message, "MATM Transaction", "danger");
        this.loading = false;
      }
    );
  }

  /*Get user role from local storage*/

  filterUser(e){
 this.options=[];
    if (e != null && e.length >= 4 && e.length<=10){
      this.http.post('admin/filterUser',{value:e}).subscribe((result) => {
        
        if(result.response){
          result.data.forEach(u => {
            let name=u.fname+' '+u.lname;
            this.options.push(name+'-'+u.contact);
          });
        }
      });
     /*  let result=this.apiCall.getRetailer(e);
      console.log(result) */
     
    }

  }

   getUserData() {
    this.user = JSON.parse(window.atob(localStorage.getItem("user")));
    console.log(this.user);
  }

}
