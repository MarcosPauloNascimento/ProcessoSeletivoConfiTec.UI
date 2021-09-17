import { User } from './../models/usuario.model';
import { UsuarioService } from '../services/usuario.service';
import { Component, EventEmitter, Output } from '@angular/core';
@Component({
  selector: 'app-usuario',
  templateUrl: '../novo/usuario.component.html',
  styleUrls: ['../novo/usuario.component.css']
})

export class NovoUsuarioComponent {
  @Output() aoSalvar = new EventEmitter<any>();

  escolaridades: any = ['Infantil','Fundamental', 'Medio', 'Superior'];

  errorMesages: any[] = [];

  usuario: User = {
    id: 0,
    name: '',
    lastName: '',
    email: '',
    birthDate: '',
    schooling: ''
  };
  submitted = false;

  constructor(private usuarioService: UsuarioService) { }

  salvarUsuario(): void {

    const data = this.usuario;

    this.usuarioService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
          this.novoUsuario();
        },
        (error) => {
          this.validarErros(error.error.errors);
        });
    this.novoUsuario();
  }

  validarErros(errors: any){

    if (errors.Name){
      errors.Name.map((e) => {
        this.errorMesages.push(e)
      });
      console.log(this.errorMesages);
    }

  }

  novoUsuario(): void {
    this.submitted = false;
    this.usuario = {
      id: 0,
      name: '',
      lastName: '',
      email: '',
      birthDate: '',
      schooling: ''
    };
  }

}
