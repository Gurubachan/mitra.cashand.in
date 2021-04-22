import { Component, OnInit } from "@angular/core";
import { HttpService } from "../../../services/http.service";

@Component({
  selector: "ngx-wallet",
  templateUrl: "./wallet.component.html",
  styleUrls: ["./wallet.component.scss"],
})
export class WalletComponent implements OnInit {
  loading: boolean = false;
  constructor(private http: HttpService) {}

  ngOnInit(): void {
    this.getWalletReport();
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
          this.wallet = result.data;
          this.loading = false;
        } else {
        }
      },
      (error) => {
        console.log(error.error);
        this.loading = false;
      }
    );
  }
}
