import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {     

  constructor() { 
    
    this.contarTres()
    .then(
      mensaje => console.log("Termino Promesa", mensaje)
    ).catch(error => console.error("Error en la promesa",error));
  }

  contarTres():Promise<boolean>{
    return new Promise( (resolve, reject) => {
      let contador:number = 0;

        let intervalo = setInterval( ()=>{
            contador +=1;
            console.log(contador);

            if( contador === 3) {
              resolve(true);
              //reject('un error');
              clearInterval(intervalo); // Detiene el intervalo sino sigue ejecutando por mas que se resuelva la promesa
            }
          }, 1000); // Cada 1 segundo
    });
  }


  ngOnInit() {
  }

}
