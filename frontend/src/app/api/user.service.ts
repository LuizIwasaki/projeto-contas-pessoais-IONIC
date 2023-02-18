import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StatusCodes } from 'http-status-codes';

const baseUrl = 'http://localhost:3333';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public obterUsuarios() {
    return this.http.get(`${baseUrl}/users`).toPromise();
  }
  public excluirUsuarios(id: any) {
    return this.http.delete(`${baseUrl}/users/${id}`).subscribe(() => StatusCodes.ACCEPTED);
  }

  createUser(user: any) {
    return this.http
    .post(`${baseUrl}/users`, user)
    .toPromise();
  }
  getAll(): Promise<any> {

    return this.http
    .get(`${baseUrl}/users`)
    .toPromise();
  }
}