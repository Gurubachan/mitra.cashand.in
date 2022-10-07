import { Component, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { Data, Link, QRMaster, QRMasterResponse } from '../../../@model/qrMaster/qrMasterResponse';
import { HttpService } from '../../../services/http.service';
import { NbDialogService } from "@nebular/theme";
import { UpiMappingDialogComponent } from '../../component/dialog/upi-mapping-dialog/upi-mapping-dialog.component';
import { ToastrService } from '../../../services/toastr.service';
@Component({
  selector: 'ngx-qrmaster',
  templateUrl: './qrmaster.component.html',
  styleUrls: ['./qrmaster.component.scss']
})
export class QRMasterComponent implements OnInit {
  qrMaster:Data=null;
  
  name = "Mr";
  base64Image: any;
  endpoint = "upi/fetchQRMaster";
  constructor(private http: HttpService, private dialogService: NbDialogService, private toast: ToastrService) { }

  ngOnInit(): void {
    this.getQRMaster();
  }

  getQRMaster(){
    this.http.post("upi/fetchQRMaster", null).subscribe((data:QRMasterResponse) => {
      if(data.response){
        this.qrMaster=data.data;
      
      }else{
        console.log(data.message);
      }
    });
  }


   downloadImage(imageUrl: string, name: String) {
   /*  let imageUrl =
      "http://southparkstudios.mtvnimages.com/shared/characters/celebrities/mr-hankey.png?height=165"; */

    this.getBase64ImageFromURL(imageUrl).subscribe(base64data => {
      console.log(base64data);
      this.base64Image = "data:image/jpg;base64," + base64data;
      // save image to disk
      var link = document.createElement("a");

      document.body.appendChild(link); // for Firefox

      link.setAttribute("href", this.base64Image);
      link.setAttribute("download", name+".png");
      link.click();
    });
  }

  getBase64ImageFromURL(url: string) {
    return Observable.create((observer: Observer<string>) => {
      const img: HTMLImageElement = new Image();
      img.crossOrigin = "*";
      img.src = url;
      if (!img.complete) {
        img.onload = () => {
          observer.next(this.getBase64Image(img));
          observer.complete();
        };
        img.onerror = err => {
          observer.error(err);
        };
      } else {
        observer.next(this.getBase64Image(img));
        observer.complete();
      }
    });
  }

  getBase64Image(img: HTMLImageElement) {
    const canvas: HTMLCanvasElement = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx: CanvasRenderingContext2D = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    const dataURL: string = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  }

  goToPage(url: string) {
    //this.loading = true;
    let param = url.split("?");
    //console.log(param);
    /* let data = {
      startDate: this.formControl.value,
      endDate: this.ngModelDate,
      type: this.selectedTxnType,
      status: this.selectedTxnStatus,
    }; */
    

    this.http.post(this.endpoint + "?" + param[1], null).subscribe(
      (res: QRMasterResponse) => {

        if (res.response) {
          this.qrMaster = res.data;
          console.warn(this.qrMaster);
          //this.loading = false;
        } else {
          //this.toast.showToast(res.message, "MATM Transaction", "warning");
        }
      },
      (error) => {
        //this.toast.showToast(error.error.message, "MATM Transaction", "danger");
        console.warn(error.error.message);
        //this.loading = false;
      }
    );
  }

  qrMapping(qr){
    this.dialogService
              .open(UpiMappingDialogComponent, {
                autoFocus: false,
                backdropClass: "",
                closeOnBackdropClick: false,
                closeOnEsc: false,
                dialogClass: "",
                hasScroll: false,
                viewContainerRef: undefined,
                hasBackdrop: false,
                context: {
                  title: "QR Mapping Form",
                  data:qr
                 
                },
              })
              .onClose.subscribe((response) => {
                console.log(response);
                if(response!=false){
 //data.remark=response;
                 let postData={
                  qrId:qr.id,
                  userId:response.userId,
                  businessName:response.name
                 };
                 this.http.post('upi/mapStaticQR',postData).subscribe((res)=>{
                  console.log(res);
                  if(res.response){
                    this.toast.showToast("QR COde Mapped","UPI","success");
                  }else{
                     this.toast.showToast("Unable to update QR Code. Please refresh.","UPI","warning");
                  } 
                  
                },(err: any) => {
                    console.log(err);
                    this.toast.showToast(err.error.message, "Service", "danger");
                  }
                )
                }
                             
              });
  }

}
