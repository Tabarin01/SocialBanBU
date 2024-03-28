import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, catchError, tap, throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private baseUrl = "http://localhost:5454";

  constructor(private http: HttpClient) {}

  userSubject = new BehaviorSubject<any>({
    users: [],
    loading: false,
    newUser:null
  });

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem("jwt");
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    });
  }

  getAllUsers(): Observable<any> {
    const headers = this.getHeaders();
    return this.http
      .get(`${this.baseUrl}/api/users/allUsers`, { headers })
      .pipe(
        tap((users) => {
          const currentState = this.userSubject.value;
          this.userSubject.next({ ...currentState, users });
        }),
        catchError((error) => {
          console.error("errore durante il recupero degli utenti: ", error);
          return throwError(error);
        })
      );
  }
}
