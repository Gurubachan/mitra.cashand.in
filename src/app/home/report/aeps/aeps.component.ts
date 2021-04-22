import { Component, OnInit } from "@angular/core";
import { HttpService } from "../../../services/http.service";

@Component({
  selector: "ngx-aeps",
  templateUrl: "./aeps.component.html",
  styleUrls: ["./aeps.component.scss"],
})
export class AepsComponent implements OnInit {
  transactions: any;
  constructor(private http: HttpService) {}

  ngOnInit(): void {
    this.fetchTransaction();
  }

  fetchTransaction() {
    this.http.post("services/transaction", null).subscribe(
      (resulte) => {
        if (resulte.response) {
          this.transactions = resulte.data;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
