import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from "../../config/config";
import {UsuarioService} from "../usuario/usuario.service";
import {Hospital} from "../../models/hospital.model";
import swal from 'sweetalert';

@Injectable()
export class HospitalService {

  totalHospitales:number = 0;

  constructor(public http:HttpClient,
              public usuarioService:UsuarioService) { }

  cargarHospitales(){
    let url = URL_SERVICIOS + '/hospital';
    return this.http.get(url)
      .map( (resp:any) =>{
        this.totalHospitales = resp.total;
        return resp;
    });
  }

  findAll(desde:number=0)
  {
    let url = URL_SERVICIOS + '/hospital?desde=' + desde;
    return this.http.get(url).map( (resp:any) =>{
      this.totalHospitales = resp.total;
      return resp;
    });
  }

  obtenerHospital(id:string){
    let url = URL_SERVICIOS + '/hospital/' + id ;
    return this.http.get(url)
      .map( (resp:any) =>{
        return resp.hospital;
      });
  }

  borrarHospital(id: string){
    let url = URL_SERVICIOS + '/hospital/' + id ;
    url += '?token='+this.usuarioService.token;
    return this.http.delete(url)
      .map( (resp:any) =>{
        swal('Hospital Borrado', 'Eliminado Correctamente', 'success');
      });
  }

  crearHospital(nombre: string){
    let url = URL_SERVICIOS + '/hospital/';
    url += '?token='+this.usuarioService.token;
    return this.http.post( url,{nombre:nombre} )
      .map( (resp:any) =>{
        swal('Hospital Creado', 'Creado Correctamente', 'success');
        return resp.hospital;
      });
  }

  findHospitales(termino:string)
  {
    let url = URL_SERVICIOS + '/busqueda/colleccion/hospitales/' + termino;
    return this.http.get(url);
  }

  actualizarHospital(hospital:Hospital){
    let url:string = URL_SERVICIOS + '/hospital/' + hospital._id;
    url +='?token='+this.usuarioService.token;

    return this.http.put(url,hospital)
      .map( (resp:any) => {
        return resp.hospital;
      });
  }
}
