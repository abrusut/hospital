import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Rutas
import { PAGES_ROUTING } from './pages.routes';

// Modulos
import { SharedModule } from '../shared/shared.modulo';
import { ChartsModule } from 'ng2-charts';
import {PipesModule} from "../pipes/pipes.module";

// Componentes
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from "./profile/profile.component";
import { UsuariosComponent } from "./usuarios/usuarios.component";
import {HospitalesComponent} from "./hospitales/hospitales.component";
import { MedicosComponent } from './medicos/medicos.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { MedicoComponent } from './medicos/medico.component';


@NgModule({
    declarations: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        IncrementadorComponent,
        GraficoDonaComponent,
        AccountSettingComponent,
        PromesasComponent,
        RxjsComponent,
        ProfileComponent,
        UsuariosComponent,
        HospitalesComponent,
        MedicosComponent,
        MedicoComponent,
        BusquedaComponent
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component
    ],
    imports: [
        FormsModule,
        CommonModule,
        SharedModule,
        ChartsModule,
        PipesModule,
        PAGES_ROUTING
    ]
})
export class PageModule { }
