import { Component, Injector, Injectable } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController } from 'ionic-angular';
import { RequestService } from '../../service/request.service';
import { APP_CONFIG } from '../../app/app.config';

/**
 * Generated class for the TipoAtendimentoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({ name: 'TipoAtendimento', segment: 'tipo-atendimento'})
@Component({ selector: 'page-tipo-atendimento', templateUrl: 'tipo-atendimento.html'})

export class TipoAtendimentoPage {

  tiposAtendimento: any;

  constructor(public loadingCtrl: LoadingController, public events: Events, public navCtrl: NavController, public navParams: NavParams, private requestService: RequestService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TipoAtendimentoPage');
    this.listarTiposDeAtedimento();
  }

  listarTiposDeAtedimento(){
		let loading = this.loadingCtrl.create();
		loading.present();
		this.requestService.getData(APP_CONFIG.WEBSERVICE.LISTAR_TIPO_ATENDIMENTO).then((tiposAtendimento: any) => {
      this.tiposAtendimento = tiposAtendimento;
      console.log(this.tiposAtendimento);
			loading.dismiss();
		}, error => {
			console.error(error);
			loading.dismiss();
		});
	 }

}
