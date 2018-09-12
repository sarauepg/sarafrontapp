import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Events, ModalController, ToastController, LoadingController } from 'ionic-angular';
import { RequestService } from '../../service/request.service';
import { APP_CONFIG } from '../../app/app.config';
import moment from 'moment';

/**
 * Generated class for the AgendamentoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({ name: 'Agendamento', segment: 'agendamento' })
@Component({ selector: 'page-agendamento', templateUrl: 'agendamento.html' })
export class AgendamentoPage {

  items = [];
  tiposAtendimento: any = [];
  filtro: any = {};
  agendamentos: any = [];
  dataAgendamento: string;
  listPage: number = 1;
  listSize: number = 10;
  list: any = [];

  constructor(public loadingCtrl: LoadingController, private requestService: RequestService, public modalCtrl: ModalController, public toastCtrl: ToastController, public events: Events, public menuCtrl: MenuController, public navCtrl: NavController, public navParams: NavParams) {

    this.listarTiposDeAtendimento();
    this.dataAgendamento = moment().format('DD-MM-YYYY');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgendamentoPage');
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }

  filtrarAgendamento() {
    if (moment(this.dataAgendamento, 'DD-MM-YYYY').isValid) {
      let loading = this.loadingCtrl.create();
      loading.present();
      this.listPage = 1;
      this.list = [];
      this.filtro.dataAgendamento = moment(this.dataAgendamento, 'DD-MM-YYYY').format('YYYY-MM-DD');
      if (this.filtro.idTipoAtendimento == "null") {
        delete this.filtro.idTipoAtendimento;
      }
      let urlRequest = this.requestService.buildHttpBodyFormData(this.filtro, APP_CONFIG.WEBSERVICE.FILTRAR_AGENDAMENTO);
      this.requestService.getData(urlRequest).then((agendamentos: any) => {
        this.agendamentos = agendamentos;
        let tam = this.listSize;
        this.listSize > this.agendamentos.length ? tam = this.agendamentos.length : tam = this.listSize;
        for (let i = 0; i < tam; i++) {
          this.list.push(this.agendamentos[i]);
        }
        console.log(this.agendamentos);
        loading.dismiss();
      }, error => {
        console.error(error);
        loading.dismiss();
        this.presentToast(error.errorMessage);
      });
    }
  }

  listarTiposDeAtendimento() {
    this.requestService.getData(APP_CONFIG.WEBSERVICE.LISTAR_TIPO_ATENDIMENTO).then((tiposAtendimento: any) => {
      this.tiposAtendimento = tiposAtendimento;
      console.log(this.tiposAtendimento);
    }, error => {
      console.error(error);
    });
  }

  abrirModalCadastroAgendamento() {
    console.log();
    const modal = this.modalCtrl.create("ModalCadastroAgendamento", { enableBackdropDismiss: false });
    modal.onDidDismiss(data => {
      if (data) {
        this.presentToast("Agendamento cadastrado com sucesso!");
      }
    });
    modal.present();
  }

  doInfinite(infiniteScroll) {
    this.listPage = this.listPage + 1;
    setTimeout(() => {
      let tam = (this.listPage * this.listSize);
      tam > this.agendamentos.length ? tam = this.agendamentos.length : tam = tam
      for (let i = ((this.listPage * this.listSize) - this.listSize); i < tam; i++) {
        this.list.push(this.agendamentos[i]);
      }
      infiniteScroll.complete();
    }, 500);
  }

  presentToast(msg) {
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 5000
    });
    toast.present();
  }

}
