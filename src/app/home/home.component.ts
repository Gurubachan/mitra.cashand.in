import { Component, OnInit } from "@angular/core";
import { MENU_ITEMS } from "./menu";
import { Router } from "@angular/router";

import { Idle, DEFAULT_INTERRUPTSOURCES } from "@ng-idle/core";
import { Keepalive } from "@ng-idle/keepalive";
import { NbAuthService } from "@nebular/auth";

@Component({
  selector: "ngx-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  idleState = "Not started.";
  timedOut = false;
  lastPing?: Date = null;
  title = "angular-idle-timeout";
  constructor(
    private idle: Idle,
    private keepalive: Keepalive,
    private router: Router,
    private service: NbAuthService
  ) {
    // sets an idle timeout of 5 seconds, for testing purposes.
    idle.setIdle(900);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    idle.setTimeout(5);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onIdleEnd.subscribe(() => {
      this.idleState = "No longer idle.";
      //console.log(this.idleState);
      this.reset();
    });

    idle.onTimeout.subscribe(() => {
      this.idleState = "Timed out!";
      this.timedOut = true;
      //console.log(this.idleState);
      this.router.navigateByUrl("auth/logout");
    });

    idle.onIdleStart.subscribe(() => {
      this.idleState = "You've gone idle!";
      //console.log(this.idleState);
      //this.childModal.show();
    });

    idle.onTimeoutWarning.subscribe((countdown) => {
      this.idleState = "You will time out in " + countdown + " seconds!";
      // console.log(this.idleState);
    });

    // sets the ping interval to 15 seconds
    keepalive.interval(15);

    keepalive.onPing.subscribe(() => (this.lastPing = new Date()));

    this.reset();
  }
  user = JSON.parse(localStorage.getItem("user"));

  menu = MENU_ITEMS[parseInt(this.user.role)];
  ngOnInit(): void {
    //console.log(this.user);
  }

  reset() {
    this.idle.watch();
    this.idleState = "Started.";
    this.timedOut = false;
  }
}
