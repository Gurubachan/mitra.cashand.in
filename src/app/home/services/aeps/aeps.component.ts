import { Component, OnInit } from '@angular/core';

import {HttpService} from '../../../services/http.service';


@Component({
  selector: 'ngx-aeps',
  templateUrl: './aeps.component.html',
  styleUrls: ['./aeps.component.scss'],
})
export class AepsComponent implements OnInit {
  aepsKyc: any = {};
  states: any;
  districts: any;
  submitted: boolean = false;
  showMessages: any = {};
  errors: string[] = [];
  messages: string[] = [];
  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.getState();
  }

  onFormSubmit() {
    this.submitted = true;
    console.log(this.aepsKyc);
    this.http
      .post('services/iciciKyc', this.aepsKyc)
      .subscribe((result: any) => {
        console.log(result);
      }, (error) => {
        this.submitted = false;
        this.showMessages.error = true;
        this.errors.push(error);
      });
  }
  getState() {
    this.http.get('state').subscribe(result => {
      this.states = result;
    });
  }

  getDistrict(e) {
    this.http
      .post('district', {'stateid': e})
      .subscribe(result => {
      this.districts = result;
    });
  }


}
