import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the VisaoGeralPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'VisaoGeral',
  segment: 'visao-geral'
})
@Component({
  selector: 'page-visao-geral',
  templateUrl: 'visao-geral.html',
})
export class VisaoGeralPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VisaoGeralPage');
  }

}
