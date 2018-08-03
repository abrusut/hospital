import { Injectable } from '@angular/core';
import {UsuarioService} from "../usuario/usuario.service";

@Injectable()
export class SidebarService {

  menu:any = [];

  /**
   *  se traslada logica el backend login.js
   *
  menu: any[] = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Dashboard', url: '/dashboard'  },
        { titulo: 'Progress', url: '/progress'  },
        { titulo: 'Graficos', url: '/graficas1'  },
        { titulo: 'Promesas', url: '/promesas'  },
        { titulo: 'rxjs', url: '/rxjs'  }
      ]
    },
    {
      titulo: 'Mantenimientos',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        { titulo: 'Usuarios', url: '/usuarios'  },
        { titulo: 'Hospitales', url: '/hospitales' },
        { titulo: 'Medicos', url: '/medicos'  }

      ]
    }
  ];

   **/

  constructor( public usuarioService:UsuarioService) {

  }

  cargarMenu(){
    this.menu = this.usuarioService.menu;
  }
}