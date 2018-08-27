import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

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

  constructor(public events: Events, public navCtrl: NavController, public navParams: NavParams) {

    events.subscribe('menu:opened', () => {
      let elm = <HTMLElement>document.querySelector(".content-padding-side");
      elm.style.paddingRight = '23%';
    });

    events.subscribe('menu:closed', () => {
      let elm = <HTMLElement>document.querySelector(".content-padding-side");
      elm.style.paddingRight = '5%';
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TipoAtendimentoPage');
  }

}
