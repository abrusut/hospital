import { Injectable } from '@angular/core';
import {UsuarioService} from "../usuario/usuario.service";
import {HttpClient} from "@angular/common/http";
import {URL_SERVICIOS} from "../../config/config";
import {Medico} from "../../models/medico.model";
import swal from 'sweetalert';

@Injectable()
export class MedicoService {

  totalMedicos:number = 0;

  constructor(public http:HttpClient,
              public usuarioService:UsuarioService) { }

  cargarMedicos(){
    let url = URL_SERVICIOS + '/medico';
    return this.http.get(url)
      .map( (resp:any) =>{
        this.totalMedicos = resp.total;
        return resp;
      });
  }

  findById(id:string){
    let url = URL_SERVICIOS + '/medico/' + id;
    return this.http.get(url)
      .map( (resp:any) =>{
        return resp.medico;
      });
  }

  findAll(desde:number=0)
  {
    let url = URL_SERVICIOS + '/medico?desde=' + desde;
    return this.http.get(url)
      .map( (resp:any) =>{
       this.totalMedicos = resp.total;
       return resp;
    });
  }

  obtenerMedico(id:string){
    let url = URL_SERVICIOS + '/medico/' + id ;
    return this.http.get(url)
      .map( (resp:any) =>{
        return resp.medico;
      });
  }

  borrarMedico(id: string){
    let url = URL_SERVICIOS + '/medico/' + id ;
    url += '?token='+this.usuarioService.token;
    return this.http.delete(url)
      .map( (resp:any) =>{
        swal('Medico Borrado', 'Eliminado Correctamente', 'success');
        return resp;
      });
  }

  guardarMedico(medico:Medico){
    let url = URL_SERVICIOS + '/medico';


    if(medico._id)
    {
      //Actualizando
      url += '/'+medico._id;
      url += '?token='+this.usuarioService.token;
      return this.http.put(url,medico)
        .map( (resp:any) => {
          swal('Medico Actualizado', 'Actualizado Correctamente', 'success');
          return resp.medico;
        });
    }else{
      //Alta medico
      url += '?token='+this.usuarioService.token;
      return this.http.post( url,medico )
        .map( (resp:any) =>{
          swal('Medico Creado', 'Creado Correctamente', 'success');
          return resp.medico;
        });
    }


  }

  findMedicos(termino:string)
  {
    let url = URL_SERVICIOS + '/busqueda/colleccion/medicos/' + termino;
    return this.http.get(url);
  }

  actualizarMedico(medico:Medico){
    let url:string = URL_SERVICIOS + '/medico/' + medico._id;
    url +='?token='+this.usuarioService.token;

    return this.http.put(url,medico)
      .map( (resp:any) => {
        return resp.medico;
      });
  }
}
