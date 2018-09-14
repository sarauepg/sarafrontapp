import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Events, ModalController, ToastController, LoadingController, AlertController } from 'ionic-angular';
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

  constructor(private alertCtrl: AlertController, public loadingCtrl: LoadingController, private requestService: RequestService, public modalCtrl: ModalController, public toastCtrl: ToastController, public events: Events, public menuCtrl: MenuController, public navCtrl: NavController, public navParams: NavParams) {

    this.listarTiposDeAtendimento();
    this.dataAgendamento = moment().format('DD-MM-YYYY').toString();
    this.filtrarAgendamento();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgendamentoPage');
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }

  filtrarAgendamento() {
    if (moment(this.dataAgendamento, 'DD-MM-YYYY').isValid() && this.dataAgendamento.length == 10) {
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

  alertCancelarAgendamento(agendamento) {
    let alert = this.alertCtrl.create({
      title: 'Cancelar agendamento',
      message: 'Você realmente deseja cancelar esse agendamento?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Sim',
          handler: () => {
            this.cancelarAgendamento(agendamento);
          }
        }
      ]
    });
    alert.present();
  }

  atenderAgendamento(agendamento){
    agendamento.status = 'A';
    agendamento.data = moment(this.dataAgendamento, 'DD-MM-YYYY').format('YYYY-MM-DD');
    console.log(agendamento);
    let data = JSON.parse(JSON.stringify(agendamento));
    this.requestService.putData(APP_CONFIG.WEBSERVICE.ALTERAR_AGENDAMENTO, data).then((response: any) => {
      console.log(response);
      agendamento.data = moment(agendamento.data, 'YYYY-MM-DD').format('DD-MM-YYYY');
    }, erro => {
      console.error(erro);
      this.presentToast(erro.errorMessage);
    });
  }

  cancelarAgendamento(agendamento) {
    agendamento.status = 'C';
    agendamento.data = moment(this.dataAgendamento, 'DD-MM-YYYY').format('YYYY-MM-DD');
    console.log(agendamento);
    let data = JSON.parse(JSON.stringify(agendamento));
    this.requestService.putData(APP_CONFIG.WEBSERVICE.ALTERAR_AGENDAMENTO, data).then((response: any) => {
      console.log(response);
      agendamento.data = moment(agendamento.data, 'YYYY-MM-DD').format('DD-MM-YYYY');
    }, erro => {
      console.error(erro);
      this.presentToast(erro.errorMessage);
    });
  }

  nextDay() {
    this.dataAgendamento = moment(this.dataAgendamento, 'DD-MM-YYYY').add(1, 'days').format('DD-MM-YYYY').toString();
    this.filtrarAgendamento();
  }

  previousDay() {
    this.dataAgendamento = moment(this.dataAgendamento, 'DD-MM-YYYY').subtract(1, 'days').format('DD-MM-YYYY').toString();
    this.filtrarAgendamento();
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
        this.filtrarAgendamento();
      }
    });
    modal.present();
  }

  abrirModalCadastroAtendimento(agendamento) {
    console.log();
    const modal = this.modalCtrl.create("ModalCadastroAtendimento", { agendamento: agendamento }, { enableBackdropDismiss: false });
    modal.onDidDismiss(data => {
      if (data) {
        this.atenderAgendamento(agendamento);
        this.presentToast("Atendimento realizado com sucesso!");
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
