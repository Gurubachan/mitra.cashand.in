import { Inject, Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  NbAuthService,
  NbAuthSimpleToken,
  NB_AUTH_INTERCEPTOR_HEADER,
} from '@nebular/auth';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class HttpconfigInterceptor implements HttpInterceptor {
  constructor(
    private authService: NbAuthService,
    private injector: Injector,
    @Inject(NB_AUTH_INTERCEPTOR_HEADER)
    protected headerName: string = 'Authorization',
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
   // return next.handle(request);
     return this.authService.getToken().pipe(
      switchMap((token: NbAuthSimpleToken) => {
        if (token && token.getValue()) {
          request = request.clone({
            setHeaders: {
              [this.headerName]: 'Bearer ' + token.getValue(),
            },
          });
        }
        return next.handle(request);
      }),
    );
  }
}
