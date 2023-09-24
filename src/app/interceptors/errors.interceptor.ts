import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';


@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {
    warnings = [400, 404]
    errors = [500]
  
    constructor(private toastr: ToastrService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next
            .handle(request)
            .pipe(
                catchError(({ status, error }: HttpErrorResponse) => {
                    if(this.warnings.includes(status)) {
                        this.toastr.warning(error.error)
                    } 
                    else if(this.errors.includes(status)) {
                        this.toastr.error(error.error)
                    }
                    else {
                        this.toastr.error('Unexpected server error.', 'Oops...')
                    }
                    
                    return throwError(() => new Error(error.error))
                })
            )
    }
}