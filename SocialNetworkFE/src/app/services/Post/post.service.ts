import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, resolveForwardRef } from "@angular/core";
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
    return this.http.post(`${this.baseUrl}/api/post`, { headers }).pipe(
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

  insertComment(postData: any) {
    const headers = this.getHeaders();
    return this.http.put(
      `${this.baseUrl}/api/post/${postData.id}/comment`,
      postData,
      {
        headers,
      }
    );
  }
}

// createComment(id: any, comment: any): Observable<any> {
//   const headers = this.getHeaders();
//   return this.http
//     .put(`${this.baseUrl}/api/post/${id}/comment`, {
//       headers,
//     })
//     .pipe(
//       tap((updatedPost: any) => {
//         //debug
//         console.log(this.postSubject);

//         const currentState = this.postSubject.value;
//         const updatedPosts = currentState.posts.add((item: any) =>
//           item.id === updatedPost.id ? updatedPost : item
//         );
//         this.postSubject.next({ ...currentState, posts: updatedPosts });
//         console.log(this.postSubject);
//       })
//     );
// }
