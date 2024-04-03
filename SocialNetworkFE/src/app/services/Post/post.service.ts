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

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem("jwt");
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    });
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

  createPost(post: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(`${this.baseUrl}/api/post`, post, { headers }).pipe(
      tap((newPost) => {
        const currentState = this.postSubject.value;
        this.postSubject.next({
          ...currentState,
          posts: [newPost, ...currentState.posts],
        });
      })
    );
  }

  createComment(id: any, comment: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http
      .put(`${this.baseUrl}/api/post/${id}/comment`, comment, {
        headers,
      })
      .pipe(
        tap((updatedPost: any) => {
          //debug
          console.log(comment);

          const currentState = this.postSubject.value;
          const updatedPosts = currentState.posts.map((item: any) =>
            item.id === updatedPost.id ? updatedPost : item
          );
          this.postSubject.next({ ...currentState, posts: updatedPosts });
          console.log(this.postSubject);
        })
      );
  }

  likePost(id: any): Observable<any> {
    const headers = this.getHeaders();
    console.log("Like post numero " + id);
    return this.http
      .put(`${this.baseUrl}/api/post/${id}/like`, {}, { headers })
      .pipe(
        tap((updatedPost: any) => {
          const currentState = this.postSubject.value;
          console.log("Current State ", currentState);
          const updatedPosts = currentState.posts.map((item: any) =>
            item.id === updatedPost.id ? updatedPost : item
          );
          this.postSubject.next({ ...currentState, posts: updatedPosts });
        })
      );
  }

  updatePost(postData: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http
      .put(`${this.baseUrl}/api/post/${postData.id}`, postData, { headers })
      .pipe(
        tap((updatedPost: any) => {
          const currentState = this.postSubject.value;
          const updatedPosts = currentState.posts.map((item: any) =>
            item.id === updatedPost.id ? updatedPost : item
          );
          this.postSubject.next({ ...currentState, posts: updatedPosts });
        })
      );
  }

  getUserPost(id: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http
      .delete(`${this.baseUrl}/api/post/profilePost/${id}`, { headers })
      .pipe(
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

  deleteUserComments(id: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http
      .delete(`${this.baseUrl}/api/post/deleteComments/${id}`, { headers })
      .pipe(
        tap((deletedComments: any) => {
          const currentState = this.postSubject.value;
          const updatedPost = currentState.posts.filter(
            (item: any) => item.id !== id
          );
          this.postSubject.next({ ...currentState, posts: updatedPost });
        }),
        catchError((error) => {
          console.error("errore durante la rimozione dei commenti: ", error);
          return throwError(error);
        })
      );
  }

  deletePost(id: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(`${this.baseUrl}/api/post/${id}`, { headers }).pipe(
      tap((deletedPost: any) => {
        const currentState = this.postSubject.value;
        const updatedPost = currentState.posts.filter(
          (item: any) => item.id !== id
        );
        this.postSubject.next({ ...currentState, posts: updatedPost });
      })
    );
  }
}
