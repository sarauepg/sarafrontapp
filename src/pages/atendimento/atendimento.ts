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

  items = [];
  
  constructor(public events: Events, public navCtrl: NavController, public navParams: NavParams) {

    for (let i = 0; i < 15; i++) {
      this.items.push( this.items.length );
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AtendimentoPage');
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    setTimeout(() => {
      for (let i = 0; i < 15; i++) {
        this.items.push( this.items.length );
      }

      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }

}
