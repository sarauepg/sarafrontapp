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
      ['Teste Rápido',     166],
      ['Preventivo',      34],
      ['Consulta Médica',  3],
      ['Eletrocardiograma', 12],
      ['Ataque de animal',    96]
    ],
    options:{
      chartArea:{left:'0%',top:'5%', width:'100%',height:'100%'},
      is3D: false,
      pieHole: 0,
      fontSize:20,
      enableInteractivity: true,
      pieSliceText:'value',
      legend:{position: 'labeled', maxLines: 2},
      height: 500,
      width: 900
    }
    }
 
    AtxLotacao =  {
      chartType: 'PieChart',
      dataTable: [
        ['Atendimento', 'Lotação'],
        ['Acadêmico',     94],
        ['DEINFO',      33],
        ['DEMAT',  12],
        ['Comunidade Externa', 85],
        ['PRORH',    15],
        ['SCATE',     32],
        ['NUTEAD',      4],
        ['DEFIS',  3],
        ['DEDIR', 12],
        ['DEBIOGEM',    67]
      ],
      options:{
        colors:['#F4C2C2'/* rosinnha */,'#A9A9A9'/* cinza claro */,'#FF0800'/* vermelho */,'#66FF00' /* verde claro */,'#013220'/* verde escuro */, '#00FFFF'/* ciano */,'#0072BB'/* azul */,'#FF8C00' /* laranja */,'#967117' /* beje */,'#FFBF00'/* amarelo */,'#26428B'/* azul escuro */,'#7C0A02' /* marrom */,'#8DB600' /* verde opaco */,'#BF00FF'/* roxo */, '#F400A1'/* rosa */,'#E30022'/* vermelho */,'#555555'/* cinze escuro */,'#1B1B1B'/* preto */,'#3B2F2F'/* cinza */],
        chartArea:{left:'0%',top:'5%', width:'100%',height:'100%'},
        is3D: false,
        pieHole: 0,
        fontSize:20,
        enableInteractivity: true,
        pieSliceText:'value',
        legend:{position: 'labeled', maxLines: 2},
        height: 500,
        width: 900
      }
      }
   
  };

