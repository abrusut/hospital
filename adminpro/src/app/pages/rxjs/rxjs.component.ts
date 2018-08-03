import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/filter';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit,OnDestroy {

  subscription:Subscription;

  constructor() { 
    
    this.subscription = this.regresaObservable()
                                .retry(2)    
                                .subscribe( 
                                  resp => { console.log("Subs",resp) },
                                  error => { console.error("error en obs", error) },
                                  () => { console.log("el obs termino") }
                                );

  }

  ngOnInit() {
  }

  ngOnDestroy(){
    console.log("La pagina se cierra");
    this.subscription.unsubscribe();
  }

  regresaObservable():Observable<any>{
    return new Observable( observer => {

      let contador: number = 0;
      
      let intervalo = setInterval(()=>{
        
        contador +=1;

        let salida = {
          valor: contador
        };        

        observer.next( salida );

        // if ( contador === 3){
        //  clearInterval(intervalo);
        //  observer.complete(); 
        // }
       // Habilitar para probar el error
       //  if ( contador === 2){          
       //   observer.error('auxilio');          
       //  }
      },500);    
    })
    .retry(2)
    .map( (resp: any) => {
          return resp.valor;
    })
    .filter( (valor, index) =>{
            
      if ( (valor % 2 ) === 1 )
      {
          // impar
          return true;
      }else{
          // par
          return false;
      }
    } ) ;   
  }
}
