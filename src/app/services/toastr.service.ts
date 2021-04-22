import { Injectable } from "@angular/core";
import { NbToastrService } from "@nebular/theme";
@Injectable({
  providedIn: "root",
})
export class ToastrService {
  private index: number = 0;

  constructor(private toastrService: NbToastrService) {}

  showToast(message, title, status) {
    this.index += 1;
    this.toastrService.show(message, title + this.index, {
      status,
    });
  }
}
