import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, Provider } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { AuthService } from "./auth/auth-service.service";


const apiUrl = environment.firebase.databaseURL;

@Injectable()

export class AppInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       // const userToken: string = this.authService.getUser();
//console.log('interceptor '+userToken);

        if (req.url.startsWith('/api')) {
            req = req.clone({
               // headers: req.headers.set('Authorization', userToken),
               // headers:req.headers.set('Access-Control-Allow-Origin', '*'),
                //url: req.url.replace('/api', apiUrl),
                withCredentials: true    //при заявка ще вземе cookie и ще го прикачи към req
            })
        };

        return next.handle(req)
    }
}

export const AppInterceptorProvider: Provider = {
    multi: true,
    useClass: AppInterceptor,
    provide: HTTP_INTERCEPTORS
}