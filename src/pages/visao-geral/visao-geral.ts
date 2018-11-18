import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { RequestService } from '../../service/request.service';
import { APP_CONFIG } from '../../app/app.config';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import moment from 'moment';

/**
 * Generated class for the VisaoGeralPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({name: 'VisaoGeral',segment: 'visao-geral'})
@Component({ selector: 'page-visao-geral', templateUrl: 'visao-geral.html'})
export class VisaoGeralPage {

  private formTipoAt: FormGroup;
  private formLotacao: FormGroup;

  form1Submit = false;
  form2Submit = false;

  tipoAtxAtDataTable: Array<[string, any]> = [];
  lotacaoxAtDataTable: Array<[string, any]> = [];

  dataInicioTipoAt: string = moment().startOf('month').format('DD/MM/YYYY').toString();
  dataFimTipoAt: string = moment().endOf('month').format('DD/MM/YYYY').toString();
  dataInicioLotacao: string = moment().startOf('month').format('DD/MM/YYYY').toString();
  dataFimLotacao: string = moment().endOf('month').format('DD/MM/YYYY').toString();

  tipoAtxAt: any;
  AtxLotacao: any;



  constructor(private formBuilder: FormBuilder,
    public loadingCtrl: LoadingController, 
    private requestService: RequestService, 
    public toastCtrl: ToastController,
    public navCtrl: NavController, 
    public navParams: NavParams) {

    this.formTipoAt = this.formBuilder.group({
      dataInicio: ['', [Validators.required, Validators.minLength(10), this.dataValidator]],
      dataFim: ['', [Validators.required, Validators.minLength(10), this.dataValidator]]
    });
    this.formLotacao = this.formBuilder.group({
      dataInicio: ['', [Validators.required, Validators.minLength(10), this.dataValidator]],
      dataFim: ['', [Validators.required, Validators.minLength(10), this.dataValidator]]
    });
  }

  initGraficos() {
    let loading = this.loadingCtrl.create();
    loading.present();
    this.getGraficoAtXTipoAt();
    this.getGraficoAtXLotacao();
    loading.dismiss();
  }

  getGraficoAtXTipoAt() {
    this.form1Submit = true;
    if(this.formTipoAt.valid){
      let loading = this.loadingCtrl.create();
      loading.present();
      this.tipoAtxAtDataTable=[];
    let filtro = {
      dataInicio: moment(this.dataInicioTipoAt, 'DD/MM/YYYY').format('YYYY-MM-DD').toString(),
      dataFim: moment(this.dataFimTipoAt, 'DD/MM/YYYY').format('YYYY-MM-DD').toString()
    }
    let urlRequest = this.requestService.buildHttpBodyFormData(filtro, APP_CONFIG.WEBSERVICE.AT_X_TIPOAT);
    this.requestService.getData(urlRequest).then((grafico: any) => {
      console.log(this.tipoAtxAtDataTable);
      this.tipoAtxAtDataTable.push(['Tipo de Atendimento', 'Atendimentos'])
      grafico.forEach(fatia => {
        this.tipoAtxAtDataTable.push([fatia.nome, fatia.quantidade])
      });
      setTimeout(() => {
        this.populaTipoAtxAt();
      }, 1000);
      loading.dismiss();
    }, error => {
      console.error(error);
      loading.dismiss();
      this.presentToast(error.errorMessage);
    });
  }
  }

  getGraficoAtXLotacao() {
    this.form2Submit = true;
    if(this.formLotacao.valid){
      let loading = this.loadingCtrl.create();
      loading.present();
      this.lotacaoxAtDataTable=[];
    let filtro = {
      dataInicio: moment(this.dataInicioLotacao, 'DD/MM/YYYY').format('YYYY-MM-DD').toString(),
      dataFim: moment(this.dataFimLotacao, 'DD/MM/YYYY').format('YYYY-MM-DD').toString()
    }
    let urlRequest = this.requestService.buildHttpBodyFormData(filtro, APP_CONFIG.WEBSERVICE.AT_X_LOTACAO);
    this.requestService.getData(urlRequest).then((grafico: any) => {
      console.log(this.lotacaoxAtDataTable);
      this.lotacaoxAtDataTable.push(['Lotação', 'Atendimentos'])
      grafico.forEach(fatia => {
        this.lotacaoxAtDataTable.push([fatia.nome, fatia.quantidade])
      });
      setTimeout(() => {
        this.populaLotacaoxAt();
      }, 1000);
      loading.dismiss();
    }, error => {
      console.error(error);
      loading.dismiss();
      this.presentToast(error.errorMessage);
    });
  }
  }

  populaTipoAtxAt(){
    this.tipoAtxAt = {
      chartType: 'PieChart',
      dataTable: this.tipoAtxAtDataTable,
      options: {
        chartArea: {width: '80%', height: '80%' },
        fontSize: 18,
        pieSliceText: 'value',
        legend: {position: 'labeled', textStyle: {fontSize: 18}, maxLines: 2},
        height: 500,
        width: 900
      }
    }
  }

  populaLotacaoxAt(){
    this.AtxLotacao = {
      chartType: 'PieChart',
      dataTable: this.lotacaoxAtDataTable,
      options: {
        chartArea: {width: '80%', height: '80%' },
        fontSize: 18,
        pieSliceText: 'value',
        legend: {position: 'labeled', textStyle: {fontSize: 18}, maxLines: 2},
        height: 500,
        width: 900
      }
    }
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad VisaoGeralPage');
    this.initGraficos();
  }

  private dataValidator(control: FormControl) {
    let data = true;
    if (control.value != undefined && control.value != "") {
      data = moment(control.value, 'DD/MM/YYYY').isValid();
    }
    let valid = data ? null : { data: true };
    return valid;
  }
  presentToast(msg) {
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 5000
    });
    toast.present();
  }

}

