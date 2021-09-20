import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/usuario.model';

const baseUrl = 'https://localhost:44392/api/User';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  emitirUsuarioCriado = new EventEmitter();
  emitirUsuarioSelecionado = new EventEmitter<User>();
  constructor(private http: HttpClient) { }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(baseUrl);
  }

  atualizarLista(){
    this.emitirUsuarioCriado.emit();
  }

  detalheUsuario(usuario){
    this.emitirUsuarioSelecionado.emit(usuario);
  }

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
