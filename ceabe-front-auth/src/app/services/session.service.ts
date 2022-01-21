import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private subject = new Subject<any>();

  public session(session: boolean, username: string, firstname): void {
    this.subject.next({session: session, username: username, name: firstname});
  }

  public getSession(): Observable<any> {
    return this.subject.asObservable();
  }

  constructor() { }
}
