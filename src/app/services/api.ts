import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {environment} from '../../environments/environment';

import {throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class Api {
    url: string = environment.apiUrl;

    constructor(public http: HttpClient) {
    }

    get(endpoint: string, params?: any, headers?: any, reqOpts?: any) {
        if (!reqOpts) {
            reqOpts = {
                headers: new HttpHeaders(),
                params: new HttpParams()
            };
        }

        if (params) {
            reqOpts.params = new HttpParams();
            for (let k in params) {
                reqOpts.params = reqOpts.params.set(k, params[k]);
            }
        }

        if (headers) {
            reqOpts.headers = new HttpHeaders();
            for (let k in headers) {
                reqOpts.headers = reqOpts.headers.set(k, headers[k]);
            }
        }

        return this.http.get(endpoint.includes('https') ? endpoint : this.url + '/' + endpoint, reqOpts)
            .pipe(
                catchError((error) => {
                    this.handleError(endpoint, error);
                    return throwError(error);
                })
            );
    }

    post(endpoint: string, body: any, headers?: any, reqOpts?: any) {
        if (!reqOpts) {
            reqOpts = {
                headers: new HttpHeaders()
            };
        }

        if (headers) {
            reqOpts.headers = new HttpHeaders();
            for (let k in headers) {
                reqOpts.headers = reqOpts.headers.set(k, headers[k]);
            }
        }

        return this.http.post(this.url + '/' + endpoint, body, reqOpts)
            .pipe(
                catchError((error) => {
                    this.handleError(endpoint, error);
                    return throwError(error);
                })
            );
    }

    put(endpoint: string, body: any, headers?: any, reqOpts?: any) {
        if (!reqOpts) {
            reqOpts = {
                headers: new HttpHeaders()
            };
        }

        if (headers) {
            reqOpts.headers = new HttpHeaders();
            for (let k in headers) {
                reqOpts.headers = reqOpts.headers.set(k, headers[k]);
            }
        }

        return this.http.put(this.url + '/' + endpoint, body, reqOpts)
            .pipe(
                catchError((error) => {
                    this.handleError(endpoint, error);
                    return throwError(error);
                })
            );
    }

    delete(endpoint: string, params?: any, headers?: any, reqOpts?: any) {
        if (!reqOpts) {
            reqOpts = {
                headers: new HttpHeaders()
            };
        }

        if (params) {
            reqOpts.params = new HttpParams();
            for (let k in params) {
                reqOpts.params = reqOpts.params.set(k, params[k]);
            }
        }

        if (headers) {
            reqOpts.headers = new HttpHeaders();
            for (let k in headers) {
                reqOpts.headers = reqOpts.headers.set(k, headers[k]);
            }
        }

        return this.http.delete(this.url + '/' + endpoint, reqOpts)
            .pipe(
                catchError((error) => {
                    this.handleError(endpoint, error);
                    return throwError(error);
                })
            );
    }

    private handleError(operation = 'operation', error: any) {
        console.log(operation + ': ' + error.message);
    }
}
