import { Component, OnInit } from '@angular/core';
import { TeamResponse, TeamResponseData } from '../../../@model/myTeam/TeamResponse';
import { EncryptdecryptService } from '../../../services/encryptdecrypt.service';
import { HttpService } from '../../../services/http.service';
import { ToastrService } from '../../../services/toastr.service';

@Component({
  selector: 'ngx-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  team: TeamResponseData;
  constructor(private http: HttpService, private toast: ToastrService,private encdec: EncryptdecryptService) { }

  ngOnInit(): void {
    this.myTeam();
  }
  myTeam() {
  this.http.get("reports/team").subscribe((res:TeamResponse)=>{
    console.log(res);
     if(res.response){
        this.team = JSON.parse(this.encdec.decrypt(res.data));
        console.log(this.team);
     }
    })
  }

}
