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

  escolaridades: any = ['Infantil', 'Fundamental', 'Medio', 'Superior'];
  mensagensValidacao: '';
  toasts: any[] = [];
  usuario: User = {
    id: 0,
    nome: '',
    sobrenome: '',
    email: '',
    dataNascimento: '',
    escolaridade: ''
  };
  submitted = false;

  constructor(private usuarioService: UsuarioService) { }

  salvarUsuario(): void {
    this.validarParaSalvar();
    if (!this.mensagensValidacao) {
      const data = this.usuario;

      this.usuarioService.create(data)
        .subscribe(
          response => {
            console.log(response);
            this.submitted = true;
            this.novoUsuario();
          },
          (error) => {
            this.validarErrosRetorno(error.error.errors);
          });
    }else{
      console.log(this.mensagensValidacao);
    }
  }

  validarParaSalvar() {
    this.mensagensValidacao = '';
    for (let [key, value] of Object.entries(this.usuario)) {
      if (!value && key !== "id") {
        this.mensagensValidacao += `Informe o ${key} \n`;
      }
    }
  }

  validarErrosRetorno(errors: any) {
    this.mensagensValidacao = '';
    for (var i in errors) {
      if (errors.hasOwnProperty(i)) {
        this.mensagensValidacao += i + ": " + errors[i] + "\n";
      }
    }
  }

  novoUsuario(): void {
    this.submitted = false;
    this.usuario = {
      id: 0,
      nome: '',
      sobrenome: '',
      email: '',
      dataNascimento: '',
      escolaridade: ''
    };
  }
}
