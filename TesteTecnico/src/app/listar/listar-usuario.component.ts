import { User } from './../models/usuario.model';
import { UsuarioService } from './../services/usuario.service';
import { Component, Input, OnInit } from '@angular/core';
import { getAllLifecycleHooks } from '@angular/compiler/src/lifecycle_reflector';
@Component({
  selector: 'app-listar-usuario',
  templateUrl: '../listar/listar-usuario.component.html',
  styleUrls: ['../listar/listar-usuario.component.css']
})

export class ListarUsuarioComponent implements OnInit {
  @Input() usuarios: any[];

  textoPesquisa: string;

  constructor(private service: UsuarioService) { }

  ngOnInit() {
    this.getAll();
  }

  getAll(){
    this.service.getAll().subscribe((usuarios: User[]) => {
      this.usuarios = usuarios;
    });
  }
}
