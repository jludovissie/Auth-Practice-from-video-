import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export interface AuthResponseData{
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;

}

@Injectable({
  providedIn:'root' 
})
export class AuthService {

constructor(private http: HttpClient) {}

  login(email:string, password: string){
  return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[AIzaSyCCUPR3n5fTTwuUMD2BzHefwfkMpW00mRk]',
    {
      email: email,
      password: password,
      returnSecureToken: true,
    }
    )
  }

  signup(email:string , password: string){
  return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[AIzaSyCCUPR3n5fTTwuUMD2BzHefwfkMpW00mRk]', 
    {
      email: email,
      password: password,
      returnSecureToken: true,
    }
      ).pipe(catchError(errorRes =>{
        let errorMessage ='An unknown error has occured';
        if (!errorRes.error || errorRes.error.error){
          return throwError(errorMessage)
        }
        switch(errorRes.error.error.message){
          case 'Email_Exists':
            errorMessage ='this email exists already'
        } 
          return throwError(errorMessage)
      }))   
      };
    }  



  