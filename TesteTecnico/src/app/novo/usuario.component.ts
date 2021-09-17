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
  usuario: User = {
    Name: '',
    LastName: '',
    Email: '',
    BirthDate: '',
    Schooling: ''
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
        error => {
          console.log(error);
        });

    this.novoUsuario();

  }

  novoUsuario(): void {
    this.submitted = false;
    this.usuario = {
      Name: '',
      LastName: '',
      Email: '',
      BirthDate: '',
      Schooling: ''
    };
  }

}
