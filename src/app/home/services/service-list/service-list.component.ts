import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { NbDialogService } from '@nebular/theme';
import { KycdialogComponent } from '../../component/kycdialog/kycdialog.component';

@Component({
  selector: 'ngx-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceListComponent implements OnInit {
  serviceList: any;
  modalResponse: any;
  constructor(
    private http: HttpService,
    private dialogService: NbDialogService,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.getServices();
  }
  getServices() {
    this.http.get('services/myService').subscribe((res) => {
      if (res.response) {
        this.serviceList = res.data;
        this.cd.detectChanges();
      }
    });
  }

  doOnBoarding(index) {
    if (this.serviceList[index].serviceId === 1) {
      this.dialogService
        .open(KycdialogComponent, {
          autoFocus: false,
          backdropClass: '',
          closeOnBackdropClick: false,
          closeOnEsc: false,
          dialogClass: '',
          hasScroll: false,
          viewContainerRef: undefined,
          hasBackdrop: false,
          context: {
            title: 'Service On Boarding Form',
            type: this.serviceList[index],
            data: null,
          },
        })
        .onClose.subscribe((response) => {
          this.modalResponse = response;
          this.cd.detectChanges();
        });
    }
  }
  checkICICIKyc() {
    this.http.post('services/checkKyc', {}).subscribe((response) => {
      this.getServices();
    });
  }
}
