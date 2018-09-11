import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the VisaoGeralPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'VisaoGeral',
  segment: 'visao-geral'
})
@Component({
  selector: 'page-visao-geral',
  templateUrl: 'visao-geral.html',
})
export class VisaoGeralPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VisaoGeralPage');
  }

  tipoAtxAt =  {
    chartType: 'PieChart',
    dataTable: [
      ['Tipo de Atendimento', 'Atendimento'],
      ['Teste Rápido',     28],
      ['Preventivo',      26],
      ['Consulta Médica',  12],
      ['Eletrocardiograma', 14],
      ['Ataque de animal',    20]
    ],
  }

    AtxLotacao =  {
      chartType: 'PieChart',
      dataTable: [
        ['Atendimento', 'Lotação'],
        ['Acadêmico',     10],
        ['DEINFO',      30],
        ['DEMAT',  20],
        ['Comunidade Externa', 15],
        ['PRORH',    25]
      ],
      /* options: {title: 'Countries', allowHtml: true}, */
   
  }; 

}
