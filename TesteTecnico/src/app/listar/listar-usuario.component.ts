import { ToastrService } from 'ngx-toastr';
import { User } from './../models/usuario.model';
import { UsuarioService } from './../services/usuario.service';
import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-listar-usuario',
  templateUrl: '../listar/listar-usuario.component.html',
  styleUrls: ['../listar/listar-usuario.component.css']
})

export class ListarUsuarioComponent implements OnInit {
  @Input() usuarios: any[];
  mensagensValidacao: string;

  textoPesquisa: string;

  constructor(private service: UsuarioService, private toastrService: ToastrService) {
    this.usuarios = [];
  }

  ngOnInit() {
    this.getAll();
    this.service.emitirUsuarioCriado.subscribe(() => this.getAll());
  }

  getAll() {
    this.service.getAll().subscribe((usuarios: User[]) => {
      this.usuarios = usuarios;
    },(error) =>{
      this.usuarios = [];
    });
  }

  visualizarDetalhes(usuario) {
    let d = usuario.dataNascimento.substring(0, 10);
    usuario.dataNascimento = d;
    this.service.detalheUsuario(usuario);
  }

  removerUsuario(id) {
    this.service.delete(id).subscribe((success) => {
      this.getAll();

      this.toastrService.success("Usuario Removido com Sucesso", "Sucesso", {
        timeOut: 3000,
        progressBar: false
      });

    }, (error) => {
      this.usuarioNaoRemovido(error);
    });
  }

  usuarioNaoRemovido(error) {
    if (error.status === 404) {
      this.toastrService.error(error.error, "Erro");

    } else {
      this.validarErrosRetorno(error.error.errors);

    }
  }

  validarErrosRetorno(errors: any) {
    this.mensagensValidacao = '';
    for (var i in errors) {
      if (errors.hasOwnProperty(i)) {
        this.mensagensValidacao += `${errors[i]}`;
      }
    }
    this.toastrService.error(this.mensagensValidacao, "Erro");
  }

}
