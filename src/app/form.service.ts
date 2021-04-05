import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  url = "http://localhost:4000/userdata"

  constructor(private _http: HttpClient) { }

  userData(user: any){
    console.log("Services Data!",user);
    return this._http.post<any>(this.url, user);
  }
  
  getUserlist(){
    console.log("getUserlist!");
    return this._http.get('http://localhost:4000/userslist');
  }

  deleteUserData(_id){
    var body={
      id:_id
    }
    return this._http.post<any>('http://localhost:4000/deleteuser', body);
  }

  updateUserData(id){
    console.log(id);
    return this._http.get('http://localhost:4000/getUserData/'+id);
  }

  postupdatedUserData(data){
    return this._http.post('http://localhost:4000/updatedform/',data);
  }

  postProfile(user: any){
    return this._http.post<any>("http://localhost:4000/uploadprofile",user)
  }

  getProfileImage(){
    return this._http.get<any>("http://localhost:4000/profileImage");
  }

  imageupload(data: any){
    return this._http.post<any>("http://localhost:4000/uploadprofile",data)
  }

  getState(){
    return this._http.get<any>("http://localhost:4000/getState");
  }

  


}
