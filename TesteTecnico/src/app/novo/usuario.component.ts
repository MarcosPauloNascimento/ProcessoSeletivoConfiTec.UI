import { User } from './../models/usuario.model';
import { UsuarioService } from '../services/usuario.service';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-usuario',
  templateUrl: '../novo/usuario.component.html',
  styleUrls: ['../novo/usuario.component.css']
})

export class NovoUsuarioComponent implements OnInit {
  emitirUsuarioCriado = new EventEmitter<User>();
  escolaridades: any = ['Infantil', 'Fundamental', 'Medio', 'Superior'];
  mensagensValidacao: any;
  usuario: User = {
    id: 0,
    nome: '',
    sobrenome: '',
    email: '',
    dataNascimento: '',
    escolaridade: ''
  };
  editarUsuario = false;

  constructor(private usuarioService: UsuarioService, private toastrService: ToastrService) {
   }

  ngOnInit() {
    this.usuarioService.emitirUsuarioSelecionado.subscribe(usuarioSelecionado => this.usuario = usuarioSelecionado);
  }

  salvarUsuario(): void {
    this.validarParaSalvar();
    if (!this.mensagensValidacao) {
      const data = this.usuario;
      const id = this.usuario.id;

      if (this.editarUsuario) {
        this.editar(id, data);
      } else {
        this.criar(data);
      }

    } else {
      this.errorMessage(this.mensagensValidacao);
    }
  }

  validarParaSalvar() {
    this.mensagensValidacao = 'O(s) campo(s): ';
    let temErro = false;
    for (let [key, value] of Object.entries(this.usuario)) {
      if (!value && key !== "id") {
        this.mensagensValidacao += ` ${key}, `;
        temErro = true;
      }
    }
    this.mensagensValidacao += ` deve(m) ser preenchido(s)`;

    if (!temErro) {
      this.mensagensValidacao = '';
    }

    if (this.usuario.id > 0) {
      this.editarUsuario = true;
    }

  }

  criar(data) {
    this.usuarioService.create(data)
      .subscribe(
        response => {
          this.successMessage("Usuario Cadastrado com Sucesso!");
          this.usuario.id = response;
          this.usuarioService.atualizarLista();
          this.novoUsuario();
        },
        (error) => {
          this.validarErrosRetorno(error.error.errors);
        });
  }

  editar(id, data) {
    this.usuarioService.update(id, data)
      .subscribe(
        response => {
          this.successMessage("Usuario Atualizado com Sucesso!");
          this.usuarioService.atualizarLista();
          this.novoUsuario();
        },
        (error) => {
          this.validarErrosRetorno(error.error.errors);
        });
  }

  validarErrosRetorno(errors: any) {
    this.mensagensValidacao = '';
    for (var i in errors) {
      if (errors.hasOwnProperty(i)) {
        this.mensagensValidacao += `${errors[i]} | `;
      }
    }

    this.errorMessage(this.mensagensValidacao);
  }

  novoUsuario(): void {
    this.editarUsuario = false;
    this.usuario = {
      id: 0,
      nome: '',
      sobrenome: '',
      email: '',
      dataNascimento: '',
      escolaridade: ''
    };
  }

  successMessage(message) {
    this.toastrService.success(message, "Sucesso", {
      timeOut: 3000,
      progressBar: false
    });
  }

  infoMessage(message) {
    this.toastrService.info(message, "Validação");
  }

  errorMessage(message) {
    this.toastrService.error(message, "Erro");
  }
}
