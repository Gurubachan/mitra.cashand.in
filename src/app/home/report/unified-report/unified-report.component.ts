import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NbDateService } from "@nebular/theme";
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Data } from '../../../@model/athenticate/auth';
import { UnifiedAepsRequestParam } from '../../../@model/unifiedAepsReport/unifiedAepsRequestParam';
import { UnifiedReport } from '../../../@model/unifiedAepsReport/unifiedAepsResponse';
import { CostumehttpService } from '../../../services/costumehttp.service';
import { HttpService } from '../../../services/http.service';
import { PublicApiCallService } from '../../../services/public-api-call.service';
import { ToastrService } from '../../../services/toastr.service';

@Component({
  selector: 'ngx-unified-report',
  templateUrl: './unified-report.component.html',
  styleUrls: ['./unified-report.component.scss']
})
export class UnifiedReportComponent implements OnInit {

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
     crossAuth: Data={merchantId:null,passkey:null};
  inputFormControl: FormControl;
  aadhaarNo;
  txnAmount;
    postData:any={
      aadhaar:null,
      amount:0,
    };
    requestParam: { startDate: Date; endDate: Date } = null;
  constructor(private http: HttpService,
    protected dateService: NbDateService<Date>,
    private toast: ToastrService,
    private costumeHttp: CostumehttpService,
    private commonApi: PublicApiCallService
    ) {
    this.frommin = this.dateService.addMonth(this.dateService.today(), -2);
    //this.frommax = this.dateService.addDay(this.min, 15);
    this.frommax = this.dateService.today();
    this.tomin = this.dateService.today();
    this.tomax = this.dateService.today();
    this.today = this.dateService.today();
    this.selectedTxnType="CW";
    this.selectedTxnStatus="0";
    this.txnAmount=0;
    this.aadhaarNo="";
    
   }

  ngOnInit(): void {
    this.getUserData();
    this.authorize();
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
    console.warn(this.postData);
    let data={
        txnType:this.selectedTxnType,
        amount:this.postData.amount,
        aadhaar:this.postData.aadhaar,
        startDate:this.formControl.value,
        endDate: this.ngModelDate,
        bcAgentId:"",
        txnStatus:this.selectedTxnStatus
    };
    data.bcAgentId=null;
    if(this.inputFormControl.value !=null && this.inputFormControl.value.length > 10 ){
      console.warn(this.inputFormControl.value);
      let contact=this.inputFormControl.value.split("-");
      data.bcAgentId= contact[0];
    }
    if(this.crossAuth.merchantId!=null){
      data.bcAgentId=this.crossAuth.merchantId;
    }
    // console.log(data);

    this.requestParam = data;

    
      this.fetchUnifiedAeps(data);
    
  }

  
  fetchUnifiedAeps(data){
   
    this.costumeHttp.post(environment.aeps+"reports/transaction",this.crossAuth.passkey,data).subscribe((res: UnifiedReport)=>{
      if(res.status){
      this.loading = false;
      this.transactions=res.data;
      }else{
        this.toast.showToast(res.message, "Service", "warning"); 
        this.loading = false;
      }
    },
    (err: any) => {
        this.toast.showToast(err.error.message, "Service", "danger");
        this.loading = false;
      }
    );
  }

  authorize() {
    console.log(this.crossAuth);
    let url="aeps/authenticate";
    if(this.permiteMISRole.indexOf(this.user.role)>-1){
      url="admin/aeps_auth";
    }
    if(this.crossAuth.passkey==null){
      this.http.post(url, { }).subscribe(
            (res) => {
              if (res.response) {
              this.crossAuth=res.data;   
              console.log(res);     
              } else {
                this.toast.showToast(res.message, "Service", "warning"); 
              }
            },
            (err: any) => {
              this.toast.showToast(err.error.message, "Service", "danger");
            }
          );
    }
    
  }

  goToPage(url: string) {
    this.loading = true;
    let param = url.split("?");
    //console.log(param);
    
     this.costumeHttp.post(url,this.crossAuth.passkey,this.requestParam).subscribe((res: UnifiedReport)=>{
    //this.http.post(endpoint + "?" + param[1], this.requestParam).subscribe((res) => {
      if (res.status) {
        this.transactions = res.data;
        this.loading = false;
      }else{
          this.toast.showToast(res.message, "AEPS Transaction", "warning");
          this.loading = false;
        }
    });
  }

  checkStatus(data, i){
    console.warn(i);
    if(data.status=="INITIATED"){
      this.loading = true;
      let postData : UnifiedAepsRequestParam={
          txnType:this.selectedTxnType,
          startDate:data.created_at,
          endDate:data.updated_at,
          txnId:data.id
      };
     this.costumeHttp.post(environment.aeps+"reports/status",this.crossAuth.passkey,postData).subscribe((res: any)=>{
      console.log(res);
      this.loading=false;
      
      this.transactions.data[i].rrn=res.data.data[0].rrn;
      this.transactions.data[i].apiCreatedDate=res.data.data[0].apiCreatedDate;
      this.transactions.data[i].apiUpdatedDate=res.data.data[0].apiUpdatedDate;
      this.transactions.data[i].status=res.data.data[0].status;
      this.transactions.data[i].apiComment=res.data.data[0].apiComment;
      this.transactions.data[i].balance=res.data.data[0].balance;
      this.transactions.data[i].walletTxnRef=res.data.data[0].walletTxnRef;
      
      
      this.toast.showToast(res.message, "AEPS Status Check", "success");
     });
    }
    

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
    //console.log(this.user);
  }

}
