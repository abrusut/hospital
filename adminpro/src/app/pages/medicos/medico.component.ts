import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {HospitalService, MedicoService} from "../../services/service.index";
import {Medico} from "../../models/medico.model";
import {Hospital} from "../../models/hospital.model";
import {Router, ActivatedRoute} from "@angular/router";
import {ModalUploadService} from "../../components/modal-upload/modal-upload.service";

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  medico:Medico = new Medico('','','','','');
  hospitales:Hospital[] = [];
  hospital:Hospital = new Hospital('');

  constructor(public medicoService:MedicoService, public hospitalService:HospitalService,
              public router:Router, public activatedRoute:ActivatedRoute, public modalUploadService:ModalUploadService) { }

  ngOnInit() {

    //Levanto Hospitales para el select
    this.hospitalService.cargarHospitales()
      .subscribe( (resp:any) =>{
        this.hospitales = resp.hospitales;
        console.log(resp.hospitales);
      })

    //Levanto el Medico por parametro
    this.activatedRoute.params.subscribe( params =>{
      let id:string = params['id'];
      if(id !== 'nuevo')
      {
        this.cargarMedico(id);
      }
    });

    // Modal de imagenes - Se suscribe cuando hay notificaciones del servicio (imagen subida)
    this.modalUploadService.notificacion
      .subscribe( (resp:any) =>{
        console.log(resp);
        this.medico.img = resp.medico.img;
      });
  }

  cargarMedico(id:string){
    this.medicoService.findById(id)
      .subscribe( (resp:any) =>{
        this.medico = resp;
        this.medico.hospital = resp.hospital._id; // Convierto el Objeto Hospital del back en solo el ID
        this.cambiarHospital(this.medico.hospital);//Actualiza la imagen
      });
  }

  guardar(f: NgForm){
    console.log(f.valid);
    console.log(f.value);
    if(f.invalid)
    {
      return;
    }

    this.medicoService.guardarMedico(this.medico)
      .subscribe((resp:any) =>{
        console.log(resp);
        this.medico._id = resp._id;
        this.router.navigate(['/medico',this.medico._id]);
      });
  }

  cambiarHospital(id:string){
    console.log(id);

    this.hospitalService.obtenerHospital(id)
      .subscribe( (resp:any) =>
      {
        console.log(resp);
        this.hospital = resp;
      })
  }

  cambiarFoto(){
    this.modalUploadService.mostrarModal('medicos', this.medico._id);
  }
}
