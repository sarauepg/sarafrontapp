import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TipoAtendimentoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'TipoAtendimento',
  segment: 'tipo-atendimento'
})
@Component({
  selector: 'page-tipo-atendimento',
  templateUrl: 'tipo-atendimento.html',
})
export class TipoAtendimentoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TipoAtendimentoPage');
  }

}
