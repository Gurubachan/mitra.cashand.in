import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Observable, of } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { HttpService } from "../../../services/http.service";
import { NbDateService } from "@nebular/theme";
@Component({
  selector: "ngx-bconboarding",
  templateUrl: "./bconboarding.component.html",
  styleUrls: ["./bconboarding.component.scss"],
})
export class BconboardingComponent implements OnInit {

  user:any=null
  permiteMISRole=[9,10,14,15];

  onBordedData: any;
  loading: boolean = false;

   options: string[];
  filteredOptions$: Observable<string[]>;
  inputFormControl: FormControl;

  formControl = new FormControl(new Date());
  ngModelDate = new Date();
  frommin: Date;
  frommax: Date;
  tomin: Date;
  tomax: Date;
  today: Date;
  searchData: any;
  constructor(private http: HttpService,  protected dateService: NbDateService<Date>,) {}

  ngOnInit(): void {
    //this.getOnboarding();
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

  getOnboarding() {
    let data = {
      startDate: this.formControl.value,
      endDate: this.ngModelDate,
      contact: null,
    };
    this.searchData=data;
    this.loading = true;
    if(this.inputFormControl.value !=null && this.inputFormControl.value.length > 10 ){
      console.warn(this.inputFormControl.value);
      let contact=this.inputFormControl.value.split("-");
      data.contact= contact[0];
    }else{
      data.contact=null;
    }
    this.http.post("services/onboarded",this.searchData).subscribe((res) => {
      if (res.response) {
        this.onBordedData = res.data;
        this.loading = false;
      }
    });
  }

  goToPage(url: string) {
    this.loading = true;
    let param = url.split("?");
    console.log(param);
    this.http
      .post("services/onboarded" + "?" + param[1], this.searchData)
      .subscribe((res) => {
        if (res.response) {
          this.onBordedData = res.data;
          this.loading = false;
        }
      });
  }

  filterUser(e){
 this.options=[];
    if (e != null && e.length >= 4 && e.length<=10){
      this.http.post('admin/filterUser',{value:e}).subscribe((result) => {
        
        if(result.response){
          result.data.forEach(u => {
            let name=u.fname+' '+u.lname;
            this.options.push(u.contact+'-'+name);
          });
          
        }
      });
    
    }

  }

  getUserData() {
    this.user = JSON.parse(window.atob(localStorage.getItem("user")));
    console.log(this.user);
  }

  
}
