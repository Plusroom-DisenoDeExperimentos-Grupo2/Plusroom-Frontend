import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
base_URL = "http://localhost:8080/api";

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log(`An error ocurred ${error.status}, body was: ${error.error}`);
    } else {
      console.log(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }


  createPost(post: any): Observable<any> {
    return this.http.post(`${this.base_URL}/posts`, JSON.stringify(post), this.httpOptions).pipe(retry(2),catchError(this.handleError));
  }

  getListPosts(landlordId: number): Observable<any> {
    return this.http.get(`${this.base_URL}/posts/landlord/${landlordId}`).pipe(retry(2), catchError(this.handleError));
  }

  getPost(id: number): Observable<any> {
    return this.http.get(`${this.base_URL}/posts/${id}`).pipe(retry(2),catchError(this.handleError));
  }

  updatePost(post: any): Observable<any> {
    return this.http.put(`${this.base_URL}`, JSON.stringify(post), this.httpOptions).pipe(retry(2),catchError(this.handleError));
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete(`${this.base_URL}/posts/${id}`, this.httpOptions).pipe(retry(2),catchError(this.handleError));
  }

  uploadImage(postId: number, formData: FormData): Observable<any> {
    const uploadUrl = `${this.base_URL}/media/post/${postId}/upload`;
    return this.http.post(uploadUrl, formData).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }
}
