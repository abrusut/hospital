/**
 * Created by abrusutt on 17/10/2017.
 */
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import {LoginGuardGuard} from "../services/guards/login-guard.guard";
import {AdminGuard} from "../services/guards/admin.guard";
import {ProfileComponent} from "./profile/profile.component";
import {UsuariosComponent} from "./usuarios/usuarios.component";
import {HospitalesComponent} from "./hospitales/hospitales.component";
import {MedicosComponent} from "./medicos/medicos.component";
import {MedicoComponent} from "./medicos/medico.component";
import {BusquedaComponent} from "./busqueda/busqueda.component";
import {VerificaTokenGuard} from "../services/guards/verifica-token.guard";


/**
 *   La "data" de cada ruta se usa para agregar meta tags dinamicamente y setear el titulo de la pagina en la que estoy
 *   Esto se usa en BreadcrumsComponent
  */

const PAGES_ROUTES: Routes = [
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { titulo:'Dashboard', description:'Dashboard de la APP' },
        canActivate:[ VerificaTokenGuard ]
      },
      { path: 'progress', component: ProgressComponent, data: { titulo:'ProgressBars' , description:'ProgressBars de la APP' } },
      { path: 'graficas1', component: Graficas1Component, data: { titulo:'Graficas' , description:'Graficas de la APP' } },
      { path: 'account-settings', component: AccountSettingComponent, data: { titulo:'Ajustes de Tema' , description:'Ajustes de Tema de la APP' }  },
      { path: 'perfil', component: ProfileComponent, data: { titulo:'Perfil', description:'Perfil del usuario de la APP' } },
      { path: 'promesas', component: PromesasComponent, data: { titulo:'Promesas' , description:'Promesas de la APP' }  },
      { path: 'rxjs', component: RxjsComponent, data: { titulo:'Rxjs Observables' , description:'Rxjs Observables de la APP' }  },

      //Busqueda General Superior
      { path: 'busqueda/:termino', component: BusquedaComponent, data: { titulo:'Busqueda', description:'Busqueda General Superior' } },

      //Mantenimientos
      { path: 'usuarios',
        component: UsuariosComponent,
        data: { titulo:'Usuarios',
                description:'Mantenimiento de usuarios de la APP' },
        canActivate:[ AdminGuard ]

      },
      { path: 'hospitales', component: HospitalesComponent, data: { titulo:'Hospitales', description:'Mantenimiento de hospitales de la APP' } },
      { path: 'medicos', component: MedicosComponent, data: { titulo:'Medicos', description:'Mantenimiento de medicos de la APP' } },
      { path: 'medico/:id', component: MedicoComponent, data: { titulo:'Actualizar Medico', description:'Mantenimiento de un Medico de la APP' } },

      { path: '', redirectTo: '/dashboard', pathMatch: 'full'}
  ];

export const PAGES_ROUTING: ModuleWithProviders = RouterModule.forChild(PAGES_ROUTES);

