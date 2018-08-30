import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { AgendamentoPage } from '../agendamento/agendamento';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public menuCtrl: MenuController, public navCtrl: NavController) {

  }

  ionViewWillEnter(){
    this.menuCtrl.enable(false);
  }

  goToAgenda(){
    this.navCtrl.setRoot(AgendamentoPage);
  }

}
