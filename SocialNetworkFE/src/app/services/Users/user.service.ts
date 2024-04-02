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
    newUser: null,
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

  getUserById(id: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http
      .get(`${this.baseUrl}/api/users/user/${id}`, { headers })
      .pipe(
        tap((user) => {
          const currentState = this.userSubject.value;
          this.userSubject.next({ ...currentState, user });
        })
      );
  }

  updateUser(userData: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http
      .put(`${this.baseUrl}/api/users/editProfile`, userData, { headers })
      .pipe(
        tap((updatedUser: any) => {
          const currentState = this.userSubject.value;
          const updatedUsers = currentState.users.map((item: any) =>
            item.id === updatedUser.id ? updatedUser : item
          );
          this.userSubject.next({ ...currentState, users: updatedUsers });
        })
      );
  }

  deleteUser(id: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http
      .delete(`${this.baseUrl}/api/users/${id}`, { headers })
      .pipe(
        tap((deletedUser: any) => {
          const currentState = this.userSubject.value;
          const updatedUser = currentState.users.filter(
            (item: any) => item.id !== id
          );
          this.userSubject.next({ ...currentState, users: updatedUser });
        })
      );
  }
}
