import { Component, OnInit } from '@angular/core';
import { Usuario } from "../../models/usuario.model";
import { UsuarioService } from "../../services/usuario/usuario.service";
import swal from 'sweetalert';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario:Usuario;
  archivoASubir:File;
  imagenTemp:string;

  constructor(public usuarioService:UsuarioService) { }

  ngOnInit() {
    this.usuario = this.usuarioService.usuario;//Usuario Logueado
  }

  // ==================================
  // Actualizacion datos del usuario
  // ==================================
  guardar(usuario:Usuario){
    console.log(usuario);

    this.usuario.nombre = usuario.nombre;

    if(!this.usuario.google ) {
      this.usuario.email = usuario.email;
    }

    this.usuarioService.actualizarUsuario(this.usuario)
      .subscribe( ( resp:any ) =>{
        if ( resp.ok ){
          swal('Usuario Actualizado', usuario.nombre, 'success');
        }
      });
  }

  // ==================================
  // Subida de archivos
  // ==================================
  seleccionImagen(archivo:File){
    if(!archivo){
      this.archivoASubir = null;
      return;
    }

    if( archivo.type.indexOf('image')<0){
      swal('Solo Imagenes', 'El archivo seleccionado no es una imagen', 'error');
      this.archivoASubir = null;
      return;
    }

    this.archivoASubir = archivo;

    // Cargar vista previa
    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () =>{
        //Imagen en base64
        this.imagenTemp = reader.result;
    };


  }

  subirArchivo(){
    this.usuarioService.cambiarImagen(this.archivoASubir, this.usuario._id)
      .then( (resp:any) => {
        if (resp.ok) {
          swal('Usuario Actualizado', this.usuario.nombre, 'success');
        }

      }).catch( (resp:any) => {
        swal('Error Actualizado Imagen', this.usuario.nombre, 'error');
    });


  }
}
