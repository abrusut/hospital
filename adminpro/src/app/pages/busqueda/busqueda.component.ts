import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {URL_SERVICIOS} from "../../config/config";
import {Usuario} from "../../models/usuario.model";
import {Medico} from "../../models/medico.model";
import {Hospital} from "../../models/hospital.model";

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  termino:string;
  usuarios:Usuario[] = [];
  medicos:Medico[]= [];
  hospitales:Hospital[] = [];

  constructor(public activatedRoute:ActivatedRoute, public http:HttpClient) {
    this.activatedRoute.params.subscribe( (params:any) =>{
      this.termino = params['termino'];
      console.log("Buscando..."+this.termino);
      this.buscar(this.termino);
    });
  }

  ngOnInit() {

  }


  buscar(termino:string)
  {
    const url:string = URL_SERVICIOS + '/busqueda/todo/' + termino;
    this.http.get(url)
      .subscribe( (resp:any) =>{
        this.usuarios = resp.usuarios;
        this.medicos = resp.medicos;
        this.hospitales = resp.hospitales;
        console.log(resp);
      });
  }

}
