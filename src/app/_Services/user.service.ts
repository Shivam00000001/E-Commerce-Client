import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient, private userAuthService: UserAuthService) { }

  Url = "http://localhost:8081";
  requestHeader = new HttpHeaders(
    { "No-Auth": "True" }
  );
  public forUser() {
    return this.httpClient.get(this.Url + '/forUser', { responseType: 'text', });
  }
  public forAdmin() {
    return this.httpClient.get(this.Url + '/forAdmin', { responseType: "text", });
  }
  public login(LoginData: any) {
    return this.httpClient.post(this.Url + "/authenticate", LoginData, { headers: this.requestHeader });
  }

  public roleMatch(allowedRoles: any): boolean {
    let isMatch = false;
    const userRoles: any = this.userAuthService.getRoles();
    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].roleName === allowedRoles[i]) {
            isMatch = true;
            return isMatch;
          }
        }
      }
    }
    return false;
  }
}
