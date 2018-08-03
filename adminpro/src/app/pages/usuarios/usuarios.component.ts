import { Component, OnInit } from '@angular/core';
import {Usuario} from "../../models/usuario.model";
import {UsuarioService} from "../../services/usuario/usuario.service";
import {ModalUploadService} from "../../components/modal-upload/modal-upload.service";

import swal from 'sweetalert';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios:Usuario[] = [];
  desde:number = 0;
  totalRegistros:number = 0;
  cargando:boolean = true;

  constructor(public usuarioService:UsuarioService,
              public modalUploadService:ModalUploadService) { }

  ngOnInit() {
    this.cargarUsuarios();
    this.modalUploadService.notificacion
      .subscribe( (resp:any) =>{
        this.cargarUsuarios();
    });
  }

  mostrarModal(id:string){
    this.modalUploadService.mostrarModal('usuarios',id);
  }

  cargarUsuarios(){
    this.cargando=true;
    this.usuarioService.findAllUsuarios(this.desde)
      .subscribe( (resp:any) =>{

        this.usuarios = resp.usuarios;
        this.totalRegistros = resp.total;
        this.cargando=false;
        console.log(resp);
      })
  }

  cambiarDesde(valor:number)
  {
    let desde = this.desde + valor;
    if( desde > this.totalRegistros )
    {
      return;
    }
    if( desde < 0 )
    {
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();
  }

  buscar(termino:string){
    console.log( termino );

    if(termino.length<=0)
    {
      this.cargarUsuarios();
    }

    this.cargando=true;
    this.usuarioService.findUsuarios(termino)
      .subscribe( (resp:any) =>{

        this.usuarios = resp.usuarios;
        this.totalRegistros = resp.usuarios.length;
        this.cargando=false;
        console.log(resp);
      });
  }

  borrar(usuario:Usuario){

    if( usuario._id === this.usuarioService.usuario._id)
    { // Esta intentando borrar el usuario que esta logueado
      swal('No puede Borrar Usuario', 'No puede borrar a si mismo', 'error');
      return;
    }

    swal({
      title: "¿Esta Seguro?",
      text: "Esta apunto de borrar a "+usuario.nombre,
      icon: "warning",
      buttons: [true],
      dangerMode: true,
    })
      .then( borrar => {
        if (borrar) {
          this.usuarioService.borrarUsuario(usuario._id)
            .subscribe( (resp:any) =>{
              swal('Usuario Borrado', usuario.nombre, 'success');
              this.cargarUsuarios();
            });
        }
      });
  }

  guardar( usuario:Usuario ){
    this.usuarioService.actualizarUsuario(usuario)
      .subscribe( (resp:any) =>{
        swal('Usuario Actualizado', usuario.nombre, 'success');
        console.log(resp);
      });

  }
}
