import { Component, OnInit } from '@angular/core';
import { Data, ServiceResponse } from '../../../@model/services/serviceResponse';
import { HttpService } from '../../../services/http.service';
import { ToastrService } from '../../../services/toastr.service';
import { NbDialogService } from "@nebular/theme";
import { RemarkDialogComponent } from '../../component/dialog/remark-dialog/remark-dialog.component';
@Component({
  selector: 'ngx-global-service',
  templateUrl: './global-service.component.html',
  styleUrls: ['./global-service.component.scss']
})
export class GlobalServiceComponent implements OnInit {
  services: Data[];
  constructor(private http: HttpService, private toast: ToastrService, private dialogService: NbDialogService,
    ) { }

  ngOnInit(): void {
    this.getService();
  }

  getService(){
    this.http.get('services/service').subscribe((data: ServiceResponse) => {
      if(data.response){
        this.services=data.data;
        this.toast.showToast("Service Fetched","Service","success");
      }else{
        this.toast.showToast("Unable to fetch service.","Service","warning");
      }
    });
  }

  serviceLive(data: Data){
    this.dialogService
              .open(RemarkDialogComponent, {
                autoFocus: false,
                backdropClass: "",
                closeOnBackdropClick: false,
                closeOnEsc: false,
                dialogClass: "",
                hasScroll: false,
                viewContainerRef: undefined,
                hasBackdrop: false,
                context: {
                  title: "Service Notification Message",
                 
                },
              })
              .onClose.subscribe((response) => {
                 data.remark=response;
                this.http.post('services/serviceUpdate',data).subscribe((res)=>{
                  if(res.response){
                    this.toast.showToast("Service Updated","Service","success");
                  }else{
                     this.toast.showToast("Unable to update service. Please refresh.","Service","warning");
                  }
                  
                },(err: any) => {
                    console.log(err);
                    this.toast.showToast(err.error.message, "Service", "danger");
                  }
                )               
              });
  }
}
