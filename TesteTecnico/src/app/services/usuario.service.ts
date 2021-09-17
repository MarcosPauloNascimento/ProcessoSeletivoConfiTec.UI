import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/usuario.model';

const baseUrl = 'https://localhost:44392/api/User';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private listaUsuarios: any[];

  constructor(private http: HttpClient) {
    this.listaUsuarios = []
  }

  adicionar(usuario: any) {
    this.listaUsuarios.push(usuario);
  }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(baseUrl);
  }

  // getById(id: any): Observable<User> {
  //   return this.http.get(`${baseUrl}/${id}`);
  // }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}
