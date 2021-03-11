import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { AuthRoutingModule } from "./auth-routing.module";
import { environment } from "../../environments/environment";
import {
  /* NbAuthJWTToken, */
  NbAuthModule,
  NbAuthSimpleToken,
  NbPasswordAuthStrategy,
} from "@nebular/auth";
import {
  NbAlertModule,
  NbButtonModule,
  NbCheckboxModule,
  NbInputModule,
  NbSpinnerModule,
} from "@nebular/theme";
import { LoginComponent } from "./login/login.component";
import { RequestPasswordComponent } from "./request-password/request-password.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { RegisterComponent } from "./register/register.component";
import { LogoutComponent } from "./logout/logout.component";

@NgModule({
  declarations: [
    LoginComponent,
    RequestPasswordComponent,
    ResetPasswordComponent,
    RegisterComponent,
    LogoutComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,

    FormsModule,

    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NbSpinnerModule,
    NbAuthModule.forRoot({
      forms: {
        login: {
          strategy: "email",
          redirectDelay: 1000,
          socialLinks: [],
        },
        register: {
          strategy: "email",
          redirectDelay: 1000,
          socialLinks: [],
        },
      },
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: "email",
          token: {
            class: NbAuthSimpleToken,
            key: "data.token",
          },
          baseEndpoint: environment.uri,
          login: {
            endpoint: "auth/login",
            redirect: {
              success: "/dashboard",
              failure: "/auth/login",
            },
            method: "post",
          },
          register: {
            endpoint: "auth/register",
            method: "post",
            redirect: {
              success: "/auth/logout",
              failure: "/auth/register",
            },
          },
          logout: {
            redirect: {
              success: "/auth/login",
              failure: null,
            },
            endpoint: "auth/logout",
          },
          requestPass: {
            redirect: {
              success: "auth/reset",
              failure: "/auth/login",
            },

            endpoint: "auth/request-password",
          },
          resetPass: {
            redirect: {
              success: "/login",
            },
            endpoint: "auth/reset-password",
          },

          errors: {
            key: "data.errors",
          },
        }),
      ],
    }),
  ],
})
export class AuthModule {}
