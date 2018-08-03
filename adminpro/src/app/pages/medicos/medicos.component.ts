import { Component, OnInit } from '@angular/core';
import {Medico} from "../../models/medico.model";
import {MedicoService} from "../../services/medicos/medico.service";
import {ModalUploadService} from "../../components/modal-upload/modal-upload.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos:Medico[] = [];
  desde:number = 0;
  totalRegistros:number = 0;
  cargando:boolean = true;

  constructor(private medicoService:MedicoService,public modalUploadService:ModalUploadService,public router:Router) { }

  ngOnInit() {
    this.cargarMedicos();
  }


  buscar(termino:string){
    console.log( termino );

    if(termino.length<=0)
    {
      this.cargarMedicos();
    }

    this.cargando=true;
    this.medicoService.findMedicos(termino)
      .subscribe( (resp:any) =>{

        this.medicos = resp.medicos;
        this.totalRegistros = resp.medicos.length;
        this.cargando=false;
        console.log(resp);
      });
  }

  borrar(medico:Medico){
    this.medicoService.borrarMedico(medico._id)
      .subscribe( (resp:any) =>{
        this.cargarMedicos();
      });
  }

  cargarMedicos(){
    this.cargando=true;
    this.medicoService.findAll(this.desde)
      .subscribe( (resp:any) =>{
        this.medicos = resp.medicos;
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
    this.cargarMedicos();
  }
}
