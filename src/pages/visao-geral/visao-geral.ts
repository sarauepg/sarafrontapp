import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { RequestService } from '../../service/request.service';
import { APP_CONFIG } from '../../app/app.config';

/**
 * Generated class for the VisaoGeralPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({name: 'VisaoGeral',segment: 'visao-geral'})
@Component({ selector: 'page-visao-geral', templateUrl: 'visao-geral.html'})
export class VisaoGeralPage {

  tipoAtxAtDataTable: Array<[string, any]> = [];
  lotacaoxAtDataTable: Array<[string, any]> = [];

  tipoAtxAt: any;
  AtxLotacao: any;



  constructor(public loadingCtrl: LoadingController, private requestService: RequestService, public navCtrl: NavController, public navParams: NavParams) {
    this.initGraficos();
  }

  initGraficos() {
    let loading = this.loadingCtrl.create();
    loading.present();
    this.getGraficoAtXTipoAt();
    this.getGraficoAtXLotacao();
    loading.dismiss();
  }

  getGraficoAtXTipoAt() {
    this.requestService.getData(APP_CONFIG.WEBSERVICE.AT_X_TIPOAT).then((grafico: any) => {
      this.tipoAtxAtDataTable.push(['Tipo de Atendimento', 'Atendimentos'])
      grafico.forEach(fatia => {
        this.tipoAtxAtDataTable.push([fatia.nome, fatia.quantidade])
      });
      console.log(this.tipoAtxAtDataTable);
    }, error => {
      console.error(error);
    });
  }

  getGraficoAtXLotacao() {
    this.requestService.getData(APP_CONFIG.WEBSERVICE.AT_X_LOTACAO).then((grafico: any) => {
      this.lotacaoxAtDataTable.push(['Lotação', 'Atendimentos'])
      grafico.forEach(fatia => {
        this.lotacaoxAtDataTable.push([fatia.nome, fatia.quantidade])
      });
      console.log(this.lotacaoxAtDataTable);
    }, error => {
      console.error(error);
    });
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad VisaoGeralPage');
    this.tipoAtxAt = {
      chartType: 'PieChart',
      dataTable: this.tipoAtxAtDataTable,
      options: {
        chartArea: { left: '0%', top: '5%', width: '100%', height: '100%' },
        is3D: false,
        pieHole: 0,
        fontSize: 20,
        enableInteractivity: true,
        pieSliceText: 'value',
        legend: { position: 'labeled', maxLines: 2 },
        height: 500,
        width: 900
      }
    }

    this.AtxLotacao = {
      chartType: 'PieChart',
      dataTable: this.lotacaoxAtDataTable,
      options: {
        colors: ['#F4C2C2'/* rosinnha */, '#A9A9A9'/* cinza claro */, '#FF0800'/* vermelho */, '#66FF00' /* verde claro */, '#013220'/* verde escuro */, '#00FFFF'/* ciano */, '#0072BB'/* azul */, '#FF8C00' /* laranja */, '#967117' /* beje */, '#FFBF00'/* amarelo */, '#26428B'/* azul escuro */, '#7C0A02' /* marrom */, '#8DB600' /* verde opaco */, '#BF00FF'/* roxo */, '#F400A1'/* rosa */, '#E30022'/* vermelho */, '#555555'/* cinze escuro */, '#1B1B1B'/* preto */, '#3B2F2F'/* cinza */],
        chartArea: { left: '0%', top: '5%', width: '100%', height: '100%' },
        is3D: false,
        pieHole: 0,
        fontSize: 20,
        enableInteractivity: true,
        pieSliceText: 'value',
        legend: { position: 'labeled', maxLines: 2 },
        height: 500,
        width: 900
      }
    }
  }



};

