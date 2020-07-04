import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseAPI: string = 'http://localhost:5001'

  constructor(private http: HttpClient) { }

  private handlerError(error: HttpErrorResponse) {
    console.log('error: ', error);
    return throwError('Error calling api')
  }

  public login(user: any): Observable<any> {
    const endpoint = `${this.baseAPI}/cats/login`;
    return this.http.get(endpoint, { headers: {}, params: user }).pipe(
      retry(2), catchError(this.handlerError)
    )
  }

  public getCats(token: string): Observable<any> {
    const endpoint = `${this.baseAPI}/cats`;
    const headers = {
      'Authorization': `Bearer ${token}`
    }
    return this.http.get(endpoint, { headers: headers, params: {} }).pipe(
      retry(2), catchError(this.handlerError)
    )
  }

}
