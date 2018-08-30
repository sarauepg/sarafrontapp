import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

/**
 * Generated class for the PacientePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'Paciente',
  segment: 'paciente'
})
@Component({
  selector: 'page-paciente',
  templateUrl: 'paciente.html',
})
export class PacientePage {

  constructor(public events: Events, public navCtrl: NavController, public navParams: NavParams) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PacientePage');
  }

}
