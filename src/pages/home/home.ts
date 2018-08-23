import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AgendamentoPage } from '../agendamento/agendamento';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  goToAgenda(){
    this.navCtrl.setRoot(AgendamentoPage);
  }

}
