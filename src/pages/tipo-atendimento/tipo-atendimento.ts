import { Component, Injector, Injectable } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController, ToastController } from 'ionic-angular';
import { RequestService } from '../../service/request.service';
import { APP_CONFIG } from '../../app/app.config';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Aferivel } from '../../model/aferivel.model';

/**
 * Generated class for the TipoAtendimentoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({ name: 'TipoAtendimento', segment: 'tipo-atendimento' })
@Component({ selector: 'page-tipo-atendimento', templateUrl: 'tipo-atendimento.html' })

export class TipoAtendimentoPage {

  private formTipoAt: FormGroup;
  tiposAtendimento: any = [];
  tipoAt: any = {};
  aferiveis: Array<Aferivel> = new Array<Aferivel>();
  formSubmit = false;


  constructor(public toastCtrl: ToastController, private formBuilder: FormBuilder, public loadingCtrl: LoadingController, public events: Events, public navCtrl: NavController, public navParams: NavParams, private requestService: RequestService) {

    this.initAferiveis();

    this.tipoAt.agendavel = false;

    this.formTipoAt = this.formBuilder.group({
      nome: ['', Validators.required],
      responsavel: ['', Validators.required]
    });

  }

  deletaTipoAtendimento(id){
    let loading = this.loadingCtrl.create();
    loading.present();
    let urlRequest = this.requestService.buildUrlQueryParams({idTipoAt: id}, APP_CONFIG.WEBSERVICE.DELETAR_TIPO_ATENDIMENTO);
    this.requestService.deleteData(urlRequest).then(() => {
      this.listarTiposDeAtedimento();
      loading.dismiss();
      this.presentToast("Tipo de atendimento excluído com sucesso.");
    }, error => {
      console.error(error);
      loading.dismiss();
      this.presentToast(error.errorMessage);
    });
  }

  initAferiveis() {
    this.aferiveis.push(new Aferivel(1, "Temperatura", false));
    this.aferiveis.push(new Aferivel(2, "Peso", false));
    this.aferiveis.push(new Aferivel(3, "Pressão sistólica", false));
    this.aferiveis.push(new Aferivel(4, "Pressão diastólica", false));
    this.aferiveis.push(new Aferivel(5, "Glicemia", false));
    this.aferiveis.push(new Aferivel(6, "Saturação", false));
    this.aferiveis.push(new Aferivel(7, "Frequência cardíaca", false));
    this.aferiveis.push(new Aferivel(8, "Frequência respiratória", false));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TipoAtendimentoPage');
    this.listarTiposDeAtedimento();
    console.log(this.aferiveis);
  }

  listarTiposDeAtedimento() {
    let loading = this.loadingCtrl.create();
    loading.present();
    this.requestService.getData(APP_CONFIG.WEBSERVICE.LISTAR_TIPO_ATENDIMENTO).then((tiposAtendimento: any) => {
      this.tiposAtendimento = tiposAtendimento;
      console.log(this.tiposAtendimento);
      loading.dismiss();
    }, error => {
      console.error(error);
      loading.dismiss();
      this.presentToast(error.errorMessage);
    });
  }

  resetCheckBoxes(){
    this.tipoAt.agendavel = false;
    this.aferiveis.forEach(aferivel => {
      aferivel.selecionado = false;
    });
  }

  adicionarTipoAtendimento() {
    this.formSubmit = true;
    if (this.formTipoAt.valid) {
      let loading = this.loadingCtrl.create();
      loading.present();
      this.aferiveis[3].selecionado = this.aferiveis[2].selecionado;
      this.tipoAt.aferiveis = this.aferiveis;
      this.tipoAt.ativo = true;
      let data = JSON.parse(JSON.stringify(this.tipoAt));
      this.requestService.postData(APP_CONFIG.WEBSERVICE.ADICIONAR_TIPO_ATENDIMENTO, data).then((response: any) => {
        console.log(response);
        this.listarTiposDeAtedimento();
        this.formTipoAt.reset();
        this.resetCheckBoxes();
        this.formSubmit = false;
        loading.dismiss();
        this.presentToast("Tipo de atendimento cadastrado com sucesso!");
        
      }, erro => {
        console.error(erro);
        loading.dismiss();
        this.presentToast(erro.errorMessage);
      });
    } else {
      this.presentToast("Por favor, cheque os campos em destaque.");
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
