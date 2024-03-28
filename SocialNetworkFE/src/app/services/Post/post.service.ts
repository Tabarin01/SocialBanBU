import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, catchError, tap, throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PostService {
  private baseUrl = "http://localhost:5454";

  constructor(private http: HttpClient) {}

  postSubject = new BehaviorSubject<any>({
    posts: [],
    loading: false,
    newPost: null,
  });

  private getHeaders():HttpHeaders{
    const token = localStorage.getItem("jwt")
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("jwt")}`
    })
  }

  getPosts(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.baseUrl}/api/post`, { headers }).pipe(
      tap((posts) => {
        const currentState = this.postSubject.value;
        this.postSubject.next({ ...currentState, posts });
      }),
      catchError((error) => {
        console.error("errore durante il recuper dei post: ", error);
        return throwError(error);
      })
    );
  }

  createPost(post:any):Observable<any>{
    const headers=this.getHeaders();
    return this.http.post(`${this.baseUrl}/api/post`,{headers}).pipe(
      tap((newPost) => {
        const currentState = this.postSubject.value;
        this.postSubject.next({...currentState, 
          posts:[newPost,...currentState.posts]});
      })
    );
  }


}
