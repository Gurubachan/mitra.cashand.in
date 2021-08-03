import { Injectable } from "@angular/core";
import { EncryptdecryptService } from "./encryptdecrypt.service";

@Injectable({
  providedIn: "root",
})
export class CheckfeaturesService {
  myFeatures;
  constructor(private encdec: EncryptdecryptService) {}

  isGiven(serviceId: Number): Boolean {
    this.myFeatures = this.getmyService();
    let status: boolean = false;
    for (let i = 0; i < this.myFeatures.length; i++) {
      if (serviceId === this.myFeatures[i].serviceId) status = true;
    }
    return status;
  }
  getmyService(): Array<any> {
    let myFeatures = localStorage.getItem("services");
    myFeatures = this.encdec.decrypt(myFeatures);
    return JSON.parse(myFeatures);
  }
}
