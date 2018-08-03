import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from "@angular/forms";
import { UsuarioService } from "../services/service.index";
import { Usuario } from "../models/usuario.model";

declare function init_plugins();
declare const gapi:any;
import swal from 'sweetalert';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:string='';
  recuerdame:boolean = false;
  auth2:any;
  error:any = null;

  constructor(public router: Router,
              public usuarioService:UsuarioService) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();
    this.email = localStorage.getItem('email') || '';
    if( this.email.length > 0) // Si tengo algo en localStorage es por que ya se logueo y puso recordar
    {
      this.recuerdame = true;
    }
  }

  googleInit(){
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id:'512406415762-70vv5qf9e20fhle0ijebnrsfj3na5ufb.apps.googleusercontent.com',
        cookiepolicy:'single_host_origin',
        scope:'profile email'
      });

      this.attachSigIn( document.getElementById('btnGoogle'));
    });
  }

  attachSigIn(element)
  {
    this.auth2.attachClickHandler( element, {}, ( googleUser ) => {
      let profile = googleUser.getBasicProfile();
      console.log("Profile Google", profile);

      let token = googleUser.getAuthResponse().id_token;
      console.log("Token Google", token);

      //Login
      this.usuarioService.loginGoogle(token)
        .subscribe(resp=>{
          //Login success
          console.log("Respuesta login google",resp);
          window.location.href='#/dashboard'; // hago redireccion manual para que cargue bien el css
        })
    });
  }

  ingresar(forma:NgForm){
    if( forma.invalid ){
      return;
    }
    console.log("Forma valida",forma.valid);
    console.log("Forma",forma.value);

    let usuario = new Usuario(
      null,
      forma.value.email,  //Esto apunta a la propiedad "name" del formulario
      forma.value.password
    );

    this.usuarioService.login(usuario, forma.value.recuerdame)
      .subscribe( ( loginCorrecto:any )=>{
        console.log(loginCorrecto);
        this.router.navigate(['/dashboard']);

      },
        error => {
          this.error = error.error;
          swal('Error en el Login', this.error.mensaje, 'error');
          console.log(this.error.mensaje);
          console.log("ERRORRR"+error); // error path
        }
      );
  }
}
