import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

@IonicPage({
  name: 'Atendimento',
  segment: 'atendimento'
})
@Component({
  selector: 'page-atendimento',
  templateUrl: 'atendimento.html',
})
export class AtendimentoPage {

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
    console.log('ionViewDidLoad AtendimentoPage');
  }

}
