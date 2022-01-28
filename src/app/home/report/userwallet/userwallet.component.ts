import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { ToastrService } from '../../../services/toastr.service';

@Component({
  selector: 'ngx-userwallet',
  templateUrl: './userwallet.component.html',
  styleUrls: ['./userwallet.component.scss']
})
export class UserwalletComponent implements OnInit {
  wallet:any = {};
  loading:boolean=false;
  constructor(private http: HttpService, private toast: ToastrService) { }

  ngOnInit(): void {
    this.userWallet();
  }

  userWallet(){
    this.loading=true;
    this.http.get("admin/userWallet").subscribe(data => {
      this.wallet=data.data;
      this.loading=false;
    })
  }

}
