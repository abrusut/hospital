import { Component, OnInit } from '@angular/core';
import {Hospital} from "../../models/hospital.model";
import {HospitalService} from "../../services/hospital/hospital.service";
import {ModalUploadService} from "../../components/modal-upload/modal-upload.service";
import {Router} from "@angular/router";
import swal from 'sweetalert';
@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales:Hospital[] = [];
  desde:number = 0;
  totalRegistros:number = 0;
  cargando:boolean = true;

  constructor(private hospitalService:HospitalService,public modalUploadService:ModalUploadService,public router:Router) { }

  ngOnInit() {
    this.cargarHospitales();

    this.modalUploadService.notificacion
      .subscribe( (resp:any) =>{
        this.cargarHospitales();
      });
  }

  mostrarModal(id:string){
    this.modalUploadService.mostrarModal('hospitales',id);

  }

  cargarHospitales(){
    this.cargando=true;
    this.hospitalService.findAll(this.desde)
      .subscribe( (resp:any) =>{
        this.hospitales = resp.hospitales;
        this.totalRegistros = resp.total;
        this.cargando=false;
        console.log(resp);
      })
  }

  buscar(termino:string){
    console.log( termino );

    if(termino.length<=0)
    {
      this.cargarHospitales();
    }

    this.cargando=true;
    this.hospitalService.findHospitales(termino)
      .subscribe( (resp:any) =>{

        this.hospitales = resp.hospitales;
        this.totalRegistros = resp.hospitales.length;
        this.cargando=false;
        console.log(resp);
      });
  }

  borrar(hospital:Hospital){

    swal({
      title: "¿Esta Seguro?",
      text: "Esta apunto de borrar a "+hospital.nombre,
      icon: "warning",
      buttons: true,
      dangerMode: true
    }as any)
      .then( borrar => {
        if (borrar) {
          this.hospitalService.borrarHospital(hospital._id)
            .subscribe( (resp:any) =>{
              swal('Hospital Borrado', hospital.nombre, 'success');
              this.cargarHospitales();
            });
        }
      });
  }

  guardar( hospital:Hospital ){
    this.hospitalService.actualizarHospital(hospital)
      .subscribe(
        (resp:any) =>{
        swal('Hospital Actualizado', hospital.nombre, 'success');
        console.log(resp);
      }, (error:any) =>{
        swal('Error Actualizado Hospital', error.error.mensaje, 'error');
      });
  }

  crear(){
    swal({
      title: "Crear Hospital",
      text: "Ingrese Nombre Hospital",
      icon: "info",
      buttons: true,
      content: 'input',
      dangerMode: true,
    } as any)
      .then( (valor:string) => {
        if (!valor || valor.length ===0) {
          return;
        }else{
          this.hospitalService.crearHospital(valor)
            .subscribe( (resp:any) =>{
              swal('Hospital Creado', resp.nombre, 'success');
              this.cargarHospitales();
            });
        }
      });
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
    this.cargarHospitales();
  }
}
