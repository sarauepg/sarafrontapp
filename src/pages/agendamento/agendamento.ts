import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Events } from 'ionic-angular';

/**
 * Generated class for the AgendamentoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'Agendamento',
  segment: 'agendamento'
})
@Component({
  selector: 'page-agendamento',
  templateUrl: 'agendamento.html',
})
export class AgendamentoPage {

  menuAberto = true;

  constructor(public events: Events, public menuCtrl: MenuController, public navCtrl: NavController, public navParams: NavParams) {
    
    events.subscribe('menu:opened', () => {
      this.menuAberto = true;
    });

    events.subscribe('menu:closed', () => {
      this.menuAberto = false;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgendamentoPage');
  }

  ionViewWillEnter() {
    this.menuCtrl.open();
  }

}
