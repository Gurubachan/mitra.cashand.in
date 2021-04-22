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

@Injectable()
export class HttpconfigInterceptor implements HttpInterceptor {
  constructor(
    private authService: NbAuthService,
    private injector: Injector,
    @Inject(NB_AUTH_INTERCEPTOR_HEADER)
    protected headerName: string = "Authorization",
    private toast: ToastrService
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
            console.log(error);
            if (error.error instanceof ErrorEvent) {
              // client-side error
              errors = `Error: ${error.error.message}`;
            } else {
              // server-side error
              if (error.status > 0) {
                // console.log(error.error.response);
                errors = `Error Status: ${error.status}\nMessage: ${error.error.message}`;
              } else {
                errors = `Error Status: ${error.status}\nMessage: ${error.statusText}`;
              }
            }
            console.log(errors);
            this.toast.showToast(errors, error.name, "danger");
            return throwError(errors);
          })
        );
      })
    );
  }
}
