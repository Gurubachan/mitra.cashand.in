import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  NbMediaBreakpointsService,
  NbMenuService,
  NbSidebarService,
  NbThemeService,
} from "@nebular/theme";

/* import { UserData } from "../../../@core/data/users"; */
import { LayoutService } from "../../../@core/utils";
import { map, takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";

import { HttpService } from "../../../services/http.service";
import { Router } from "@angular/router";
@Component({
  selector: "ngx-header",
  styleUrls: ["./header.component.scss"],
  templateUrl: "./header.component.html",
})
export class HeaderComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;

  themes = [
    {
      value: "default",
      name: "Light",
    },
    {
      value: "dark",
      name: "Dark",
    },
    {
      value: "cosmic",
      name: "Cosmic",
    },
    {
      value: "corporate",
      name: "Corporate",
    },
  ];

  currentTheme = "corporate";

  /*userMenu = [
    { title: 'Profile', link: '/profile' },
    { title: 'Service', link: '/services/myservice'},
    { title: 'Log out', link: '/auth/logout' },
    ];*/
  userMenu = [{ title: "Profile", link: "/profile" }];
  /*token: NbAuthToken;*/
  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    /* private userService: UserData, */
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService,
    private authService: HttpService,
    private router: Router
  ) {}
  private fetchUser() {
    if (localStorage.getItem("user")) {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.user.picture = this.user.myPic;
    } else {
      this.authService.get("user").subscribe((res: any) => {
        this.user = res.data[0];
        this.user.picture = this.user.myPic;
        localStorage.setItem("user", JSON.stringify(this.user));
      });
    }

    if (
      this.user.email_verified_at == null &&
      this.user.contact_verified_at == null &&
      this.user.aadhaar == null &&
      this.user.panNo == null &&
      this.user.accountNo == null
    ) {
      localStorage.setItem("isProfileComplete", "0");
      this.router.navigateByUrl("profile");
    } else {
      localStorage.setItem("isProfileComplete", "1");
    }
    if (this.user.userGroup === 1) {
    } else {
      this.userMenu.push({ title: "Service", link: "/services/myservice" });
    }
    this.userMenu.push({ title: "Log out", link: "/auth/logout" });
  }
  ngOnInit() {
    this.fetchUser();
    this.currentTheme = this.themeService.currentTheme;
    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService
      .onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (isLessThanXl: boolean) => (this.userPictureOnly = isLessThanXl)
      );

    this.themeService
      .onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$)
      )
      .subscribe((themeName) => (this.currentTheme = themeName));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, "menu-sidebar");
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
}
