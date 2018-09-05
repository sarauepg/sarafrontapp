import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ModalController, LoadingController, ViewController, ToastController } from 'ionic-angular';
import { CompleterData, CompleterService, CompleterItem } from 'ng2-completer';
import { PessoaModel } from '../../model/pessoa.model';
import { RequestService } from '../../service/request.service';
import { FormBuilder } from '@angular/forms';
import { APP_CONFIG } from '../../app/app.config';
import moment from 'moment';

@IonicPage({ name: 'Atendimento', segment: 'atendimento' })
@Component({ selector: 'page-atendimento', templateUrl: 'atendimento.html', })
export class AtendimentoPage {

  items = [];
  tiposAtendimento: any = [];
  responsaveis: any = [];
  pacientes: any = [];
  filtro: any = {};
  atendimentos: any = [];
  dataInicial: string;
  dataFinal: string;
  listPage: number = 1;
  listSize: number = 10;
  list: any = [];

  dataService: CompleterData;
  searchData: Array<PessoaModel> = [];
  p: string;

  constructor(public modalCtrl: ModalController,
    public events: Events,
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private completerService: CompleterService,
    private viewCtrl: ViewController,
    private formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    private requestService: RequestService) {

    this.initVariables();
    this.dataService = completerService.local(this.searchData, 'nome', 'nome');
  }

  initVariables() {
    let loading = this.loadingCtrl.create();
    loading.present();
    this.listarTiposDeAtedimento();
    this.listarPacientes();
    this.listarResponsaveis();
    loading.dismiss();
  }

  selecionado(selected: CompleterItem) {
    if (selected) {
      this.filtro.idPaciente = selected.originalObject.id;
    }
  }

  filtrarAtendimento() {
    let loading = this.loadingCtrl.create();
    loading.present();
    this.listPage = 1;
    this.list = [];
    if (this.dataInicial != null && this.dataInicial != undefined) {
      this.filtro.dataInicial = moment(this.dataInicial, 'DD-MM-YYYY').format('YYYY-MM-DD');
      this.filtro.dataFinal = moment(this.dataFinal, 'DD-MM-YYYY').format('YYYY-MM-DD');
    }
    let urlRequest = this.requestService.buildHttpBodyFormData(this.filtro, APP_CONFIG.WEBSERVICE.FILTRAR_ATENDIMENTO);
    this.requestService.getData(urlRequest).then((atendimentos: any) => {
      this.atendimentos = atendimentos;
      let tam = this.listSize;
      this.listSize > this.atendimentos.length ? tam = this.atendimentos.length : tam = this.listSize;
      for (let i = 0; i < tam; i++) {
        this.list.push(this.atendimentos[i]);
      }
      console.log(this.atendimentos);
      loading.dismiss();
    }, error => {
      console.error(error);
      loading.dismiss();
      this.presentToast(error.errorMessage);
    });
  }

  listarTiposDeAtedimento() {
    this.requestService.getData(APP_CONFIG.WEBSERVICE.LISTAR_TIPO_ATENDIMENTO).then((tiposAtendimento: any) => {
      this.tiposAtendimento = tiposAtendimento;
      console.log(this.tiposAtendimento);
    }, error => {
      console.error(error);
    });
  }

  listarPacientes() {
    this.requestService.getData(APP_CONFIG.WEBSERVICE.LISTAR_PACIENTES).then((pacientes: any) => {
      this.pacientes = pacientes;
      pacientes.forEach(p => {
        this.searchData.push(new PessoaModel(p.pessoa.nome, p.pessoa.cpf, p.pessoa.id));
      });
      console.log(this.pacientes);
    }, error => {
      console.error(error);
    });
  }

  listarResponsaveis() {
    let urlRequest = this.requestService.buildUrlQueryParams({ cargo: "T" }, APP_CONFIG.WEBSERVICE.LISTAR_RESPONSAVEIS);
    this.requestService.getData(urlRequest)
      .then((responsaveis: any) => {
        this.responsaveis = responsaveis;
        console.log(this.responsaveis);
      }, error => {
        console.error(error);
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AtendimentoPage');
  }

  doInfinite(infiniteScroll) {
    this.listPage = this.listPage + 1;
    setTimeout(() => {
      let tam = (this.listPage * this.listSize);
      tam > this.atendimentos.length ? tam = this.atendimentos.length : tam = tam
      for (let i = ((this.listPage * this.listSize) - this.listSize); i < tam; i++) {
        this.list.push(this.atendimentos[i]);
      }
      infiniteScroll.complete();
    }, 500);
  }

  abrirModalCadastroAtendimento() {
    console.log();
    const modal = this.modalCtrl.create("ModalCadastroAtendimento", { enableBackdropDismiss: false });
    modal.onDidDismiss(data => {
      if (data) {
        this.presentToast("Atendimento cadastrado com sucesso!");
      }
    });
    modal.present();
  }

  presentToast(msg) {
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 5000
    });
    toast.present();
  }

}
