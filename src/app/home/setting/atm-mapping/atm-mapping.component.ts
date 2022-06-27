import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NbDialogService } from "@nebular/theme";
import { ToastrService } from '../../../services/toastr.service';

@Component({
  selector: 'ngx-atm-mapping',
  templateUrl: './atm-mapping.component.html',
  styleUrls: ['./atm-mapping.component.scss']
})
export class AtmMappingComponent implements OnInit {

  loading:Boolean = false;
  deviceAddForm: FormGroup;
  deviceMapForm: FormGroup;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private toast: ToastrService,
    private dialogService: NbDialogService,
  ) { }

  ngOnInit(): void {
    this.deviceAddForm= this.formBuilder.group({
      modelType:[null, Validators.required],
      slNo:["",Validators.required]
    })

    this.deviceMapForm= this.formBuilder.group({
      userId:[null, Validators.required],
      deviceId:[null, Validators.required],
    })
  }

  saveDevice(form: NgForm){
   console.log(form);
  }

  mpaDevice(form: NgForm){}

  get f() {
    return this.deviceAddForm.controls;
  }

  modelChange(e){
    console.warn(this.f.slNo.value);
    this.f.slNo.setValue("");
    this.deviceAddForm.get("slNo").setValidators([Validators.required])
    
    if(e=="D180"){
      this.deviceAddForm.get("slNo").setValidators([Validators.pattern("[6]{1}[A-Z]{1}[0-9]{6}")])
      
    }else if(e=="MP63"){
      this.deviceAddForm.get("slNo").setValidators([Validators.pattern("[0-9]{14}")])
      
    }else if(e=="A910"){
      this.deviceAddForm.get("slNo").setValidators([Validators.pattern("1491[0-9]{6}")])
      
    }else if(e=="wpos3"){
      this.deviceAddForm.get("slNo").setValidators([Validators.pattern("PP[0-9]{14}")])
      
    }
    this.deviceAddForm.get("slNo").updateValueAndValidity();
   
    this.deviceAddForm.setErrors({"invalid":true})

     
  }

}
