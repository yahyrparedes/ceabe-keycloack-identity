import {Injectable} from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Foo} from '../models/foo';
import {LoginService} from "./login.service";
import {OAuthService} from "angular-oauth2-oidc";

@Injectable({
  providedIn: 'root'
})
export class FooService {

  fooURL = 'http://localhost:8081/ping/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.oauthService.getAccessToken()
    })
  };

  constructor(private httpClient: HttpClient, private oauthService: OAuthService) {

  }

  public list(): Observable<Foo[]> {
    console.log("list")
    console.log(localStorage.getItem('access_token'))
    console.log(this.oauthService.getAccessToken())
    console.log(this.httpOptions)
    return this.httpClient.get<Foo[]>(this.fooURL + 'list', this.httpOptions);
  }

  public detail(id: number): Observable<Foo> {
    console.log("detail")
    console.log(localStorage.getItem('access_token'))
    console.log(this.httpOptions)
    return this.httpClient.get<Foo>(this.fooURL + `detail/${id}`, this.httpOptions);
  }

  public create(foo: Foo): Observable<any> {
    return this.httpClient.post<any>(this.fooURL + 'create', foo, this.httpOptions);
  }

  public update(id: number, foo: Foo): Observable<any> {
    return this.httpClient.put<any>(this.fooURL + `update/${id}`, foo, this.httpOptions);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.fooURL + `delete/${id}`, this.httpOptions);
  }
}
