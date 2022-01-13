import {User} from './../models/user';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from "../../environments/environment";
import {animate} from "@angular/animations";

@Injectable({
  providedIn: 'root'
})
export class UserService {


  httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

  constructor(private httpClient: HttpClient) {
  }

  public searchByRUC(ruc): Observable<any> {
    return this.httpClient.post<any>(environment.url + "/sunat/ruc", {ruc: ruc});
  }

  getCategoryList(dato): Observable<any> {
    return this.httpClient.post<any>(environment.url + "/categoria/listar", dato);
  }

  registerSupplier(dato): Observable<any> {
    return this.httpClient.post<any>(environment.service + "/user/create", dato);
  }

}
