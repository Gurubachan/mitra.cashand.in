import { Component, OnInit } from "@angular/core";
import { LocationService } from "../../../services/location.service";
const validator = require("aadhaar-validator");
@Component({
  selector: "ngx-aepsnew",
  templateUrl: "./aepsnew.component.html",
  styleUrls: ["./aepsnew.component.scss"],
})
export class AepsnewComponent implements OnInit {
  aadhaarService = {
    aadhaarNumber: (String = null),
    isAadhaarNumberValid: Boolean(false),
    bankIIN: (Number = null),
    txnType: (String = null),
    txnAmount: (Number = null),
    customerContact: (Number = null),
    customerName: (String = null),
    customerPin: (Number = null),
    customerFingurePrint: (String = null),
    longitude: (Number = null),
    latitude: (Number = null),
  };
  constructor(private locationService: LocationService) {
    this.location();
    this.aadhaarService.aadhaarNumber = "505386856827";
    console.log(this.aadhaarService);
    this.checkAadhar();
  }

  ngOnInit(): void {}

  aadhaarAtm() {}

  location() {
    this.locationService.getPosition().then((pos) => {
      this.aadhaarService.latitude = pos.lat;
      this.aadhaarService.longitude = pos.lng;
    });
  }
  checkAadhar() {
    this.aadhaarService.isAadhaarNumberValid = validator.isValidNumber(
      this.aadhaarService.aadhaarNumber
    );
  }
}
