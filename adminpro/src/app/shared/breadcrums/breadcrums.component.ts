import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd  } from '@angular/router';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrums',
  templateUrl: './breadcrums.component.html',
  styles: []
})
export class BreadcrumsComponent implements OnInit {

  label:string = '';
  descripcion:string = '';

  constructor( private router: Router,
               private title: Title,
               private meta: Meta) {

    this.getDataRoute()
      .subscribe(data => {
          //console.log(data);

          this.label = data.titulo;
          this.descripcion = data.descripcion;
          this.title.setTitle( this.label );

          this.addMetaTag('description', this.descripcion);
          this.addMetaTag('author', 'Andres Brusutti');
          this.addMetaTag('keywords', 'Guia Comercial de la Costa, Arroyo Leyes, Colastine, Rincon, Santa Fe');

        });

  }

  addMetaTag(property:string, value: any){
    let metaTag: MetaDefinition = {
            name: property,
            content: value
          };

    this.meta.updateTag(metaTag);
  }
/**
  Obtener la ruta donde estoy, la "data" se configura en los routes(pages.routes.ts)
 */
  getDataRoute(){
    return this.router.events
      .filter( evento => evento instanceof ActivationEnd )
      .filter( (evento: ActivationEnd) => evento.snapshot.firstChild === null)
      .map( (evento: ActivationEnd) => {
        return evento.snapshot.data
      });
  }



  ngOnInit() {
  }

}
