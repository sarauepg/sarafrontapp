import { Component } from '@angular/core';
import { NavController, MenuController, LoadingController, ToastController, IonicPage } from 'ionic-angular';
import { AgendamentoPage } from '../agendamento/agendamento';
import { RequestService } from '../../service/request.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { APP_CONFIG } from '../../app/app.config';

@IonicPage({ name: 'Home', segment: 'home' })
@Component({selector: 'page-home',templateUrl: 'home.html'})
export class HomePage {

  form: FormGroup = null;
	formSubmit = false;

	loginForm: any = {};

  constructor(public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public menuCtrl: MenuController, 
    public navCtrl: NavController,
    private requestService: RequestService,
    private formBuilder: FormBuilder) {

      this.form = formBuilder.group({
        nomeUsuario: ['', Validators.required],
        senha: ['', Validators.required]
      });

  }

  ionViewWillEnter(){
    this.menuCtrl.enable(false);
  }

  goToAgenda(){
    this.navCtrl.setRoot('Agendamento');
  }

  login(){
    this.formSubmit=true;
    if(this.form.valid){
    let loading = this.loadingCtrl.create();
    loading.present();
    let data = JSON.parse(JSON.stringify(this.loginForm));
            this.requestService.postData(APP_CONFIG.WEBSERVICE.LOGIN, data).then((response: any) => {
                console.log(response);
                loading.dismiss();
                this.goToAgenda();
            }, erro => {
                console.error(erro);
                loading.dismiss();
                this.presentToast(erro.errorMessage);
            });
          }
  }

  presentToast(msg) {
    const toast = this.toastCtrl.create({
        message: msg,
        duration: 5000
    });
    toast.present();
}
}
