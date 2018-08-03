import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { OutputType } from '@angular/core/src/view';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgress') txtProgress: ElementRef;

  @Input('leyenda')
  leyenda: string = 'Leyenda';

  @Input('progreso')
  progreso: number = 50;

  @Output() cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() { 
    console.log( 'leyenda' , this.leyenda);
    console.log( 'progreso' , this.progreso);
  }

  ngOnInit() {
    console.log( 'leyenda' , this.leyenda);
  }

  onChange(newValue: number){
    console.log(newValue);

    console.log(this.txtProgress);

    if ( newValue >= 100)
    {
      this.progreso = 100;
    }else if ( newValue <= 0 ){
      this.progreso = 0;
    } else {
      this.progreso = newValue;
    }    

    // Input del incrementador
    this.txtProgress.nativeElement.value = this.progreso;
    this.cambioValor.emit(this.progreso);
  }

  cambiarValor(valor: number)
  {
    if (this.progreso >= 100 && valor > 0)
    {
      this.progreso = 100;
      return;
    }
    if (this.progreso <= 0 && valor < 0)
    {
      this.progreso = 0;
      return;
    }
    this.progreso = this.progreso + valor; 
    
    // Manda el nuevo valor a las barras
    this.cambioValor.emit(this.progreso);
    
    // Input del incrementador
    this.txtProgress.nativeElement.focus();
  }
}
