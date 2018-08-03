import { Injectable } from '@angular/core';
import { Usuario } from "../../models/usuario.model";
import { HttpClient } from "@angular/common/http";
import { URL_SERVICIOS } from "../../config/config";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Router } from "@angular/router";
import { SubirArchivoService } from "../subir-archivo/subir-archivo.service";
import {Observable} from "rxjs/Observable";

import swal from 'sweetalert';

@Injectable()
export class UsuarioService {

  usuario:Usuario;
  token:string;
  menu:any=[];

  constructor(public http:HttpClient, public router:Router, public subirArchivoService:SubirArchivoService) {
    //console.log("Servicio de usuarios");
    this.cargarStorage();
  }

  renuevaToken(){
    let url:string = URL_SERVICIOS + '/login/renuevatoken';
    url +='?token='+this.token;
    return this.http.get(url)
      .map( (resp:any) =>{
          this.token = resp.token;
          localStorage.setItem('token', this.token);
          console.log( "Token renovado automaticamente ");
          return true;
      }).catch( error => {
        this.router.navigate(['/login']);
        swal('No se pudo renovar token', 'No fue posible renovar token' ,'error');
        return Observable.throw(error);
      });
  }

  cargarStorage(){
    if( localStorage.getItem('token') )
    {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    }else{
      this.token = ' ';
      this.usuario = null;
      this.menu = [];
    }
  }

  estaLogueado(){
    return ( this.token && this.token.length > 5 )? true : false;
  }

  saveLocalStorage(id:string, token:string, usuario:Usuario, menu:any){
    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));
  }

  loginGoogle(token:string)
  {
    let url:string = URL_SERVICIOS + '/login/google';

    return this.http.post(url,{ token })
      .map( (resp:any) => {
        this.saveLocalStorage(resp.id, resp.token, resp.usuario,resp.menu);
        console.log(resp);
        return true;
      });
  }

  logout()
  {
    this.usuario = null;
    this.token = null;
    this.menu = [];
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');
    this.router.navigate(['/login']);
  }

  login(usuario:Usuario, recordar:boolean = false)
  {
    if( recordar ){
      localStorage.setItem('email',usuario.email);
    }else{
      localStorage.removeItem('email');
    }

    let url:string = URL_SERVICIOS + '/login';

    return this.http.post(url,usuario)
      .map( (resp:any) => {
        this.saveLocalStorage(resp.id, resp.token, resp.usuario,resp.menu);
        console.log(resp);
        return true;
      }).catch( error => {
          console.log("Error en catch ", error.status, error.error.mensaje)
          return Observable.throw(error);
      });
  }


  crearUsuario(usuario:Usuario){
    let url:string = URL_SERVICIOS + '/usuario';

    return this.http.post(url,usuario)
      .map( (resp:any) => {
        return resp.usuario;
      }).catch( error => {
        return Observable.throw(error);
      });
  }

  actualizarUsuario(usuario:Usuario){
    let url:string = URL_SERVICIOS + '/usuario/' + usuario._id;
    url +='?token='+this.token;

    return this.http.put(url,usuario)
      .map( (resp:any) => {

        if( usuario._id === this.usuario._id)
        {// SI el usuario es el mismo logueado actualizo las variables de storage
          let usuarioDB:Usuario = usuario;// La respuesta del backend me devuelve el usuario actualizado
          this.saveLocalStorage(usuarioDB._id,this.token,usuarioDB, this.menu);
        }

        return resp;
      }).catch( error => {
        swal(error.error.mensaje, error.error.errors.message, 'error');
        return Observable.throw(error);
      });
  }

  cambiarImagen(file:File, id:string){
    return new Promise( ( resolve, reject ) =>{
      this.subirArchivoService.subirArchivo(file, 'usuarios', id)
        .then( (resp:any) =>{
          //actualizo la imagen del usuario logueado
          this.usuario.img = resp.usuario.img;
          // Actualizo datos del usuario en storage (para que se vean los cambios en front)
          this.saveLocalStorage(id, this.token, this.usuario, this.menu);
          console.log(resp);
          resolve(resp)
        }).catch( (resp:any) => {
          reject(resp);
          console.log("Error subiendo archivo ", resp);
      });
    });
  }

  findAllUsuarios(desde:number=0)
  {
    let url = URL_SERVICIOS + '/usuario?desde=' + desde;
    return this.http.get(url);
  }

  findUsuarios(termino:string)
  {
    let url = URL_SERVICIOS + '/busqueda/colleccion/usuarios/' + termino;
    return this.http.get(url);
  }

  borrarUsuario(id:string)
  {
    let url = URL_SERVICIOS + '/usuario/' + id;
    url +='?token='+this.token;

    return this.http.delete(url);
  }

}
