import { Inject, Injectable, Injector } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import {
  NbAuthService,
  NbAuthSimpleToken,
  NB_AUTH_INTERCEPTOR_HEADER,
} from "@nebular/auth";
import { catchError, retry, switchMap } from "rxjs/operators";
import { ToastrService } from "./services/toastr.service";
import { Router } from "@angular/router";

@Injectable()
export class HttpconfigInterceptor implements HttpInterceptor {
  constructor(
    private authService: NbAuthService,
    private injector: Injector,
    @Inject(NB_AUTH_INTERCEPTOR_HEADER)
    protected headerName: string = "Authorization",
    private toast: ToastrService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // return next.handle(request);
    return this.authService.getToken().pipe(
      switchMap((token: NbAuthSimpleToken) => {
        if (token && token.getValue()) {
          request = request.clone({
            setHeaders: {
              [this.headerName]: "Bearer " + token.getValue(),
            },
          });
        }
        return next.handle(request).pipe(
          retry(0),
          catchError((error: HttpErrorResponse) => {
            let errors = "";
            // console.log(error);
            if (error.error instanceof ErrorEvent) {
              // client-side error
              errors = `Error: ${error.error.message}`;
            } else {
              // server-side error
              //console.log(error.status);
              if (error.status > 0) {
                // console.log(error.error.response);
                errors = `${error.status}\n Message: ${error.error.message}`;
              } else {
                errors = `${error.status}\n Message: ${error.statusText}`;
              }
            }
            // console.log(errors);
            this.toast.showToast(errors, error.name, "danger");
            if (error.status == 401) {
              this.router.navigateByUrl("auth/logout");
            } else {
              return throwError(error);
            }
          })
        );
      })
    );
  }
}
