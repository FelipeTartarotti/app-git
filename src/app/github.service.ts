import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';  // Import it up here

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  private url =  "https://afternoon-eyrie-95627.herokuapp.com";

  constructor(private http: HttpClient) {}

  getUsers(since,per_page) {

    let headers = new HttpHeaders();
    headers.append('User-Agent','FelipeTartarotti');

    return new Promise((resolve, reject) => {
      this.http.get(this.url+"/api/users?since="+since+"&per_page="+per_page,{headers:headers})
        .subscribe((result: any) => {
          resolve(result);
        },
        (error) => {
          reject(error);
        });
    });
  }  

  getUserDetail(username){
    let headers = new HttpHeaders();
    headers.append('User-Agent','FelipeTartarotti');

    return new Promise((resolve, reject) => {
      this.http.get(this.url+"/api/users/"+username+"/details",{headers:headers})
        .subscribe((result: any) => {
          resolve(result);
        },
        (error) => {
          reject(error);
        });
    });

  }

  getUserRepo(username){
    let headers = new HttpHeaders();
    headers.append('User-Agent','FelipeTartarotti');

    return new Promise((resolve, reject) => {
      this.http.get(this.url+"/api/users/"+username+"/repos",{headers:headers})
        .subscribe((result: any) => {
          resolve(result);
        },
        (error) => {
          reject(error);
        });
    });

  }



}
