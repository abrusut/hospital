import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {

  @Input('doughnutChartData') doughnutChartData: number[] = [];
  @Input('doughnutChartLabels') doughnutChartLabels: string[] = [];
  @Input('doughnutChartType') doughnutChartType: string = '';
  @Input('leyenda') leyenda: string = '';

  @Output() chartClicked: EventEmitter<any> = new EventEmitter();

  @Output() chartHovered: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  // events
  public chartClickedEvent(e: any): void {
    console.log('Evento click en grafico-dona' , e);
    this.chartClicked.emit(e);
  }
 
  public chartHoveredEvent(e: any): void {
    console.log('Evento click en grafico-dona' , e);
    this.chartHovered.emit(e);
  }

}
