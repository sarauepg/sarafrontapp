import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ModalController, LoadingController, ViewController, ToastController, AlertController } from 'ionic-angular';
import { CompleterData, CompleterService, CompleterItem } from 'ng2-completer';
import { PessoaModel } from '../../model/pessoa.model';
import { RequestService } from '../../service/request.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { APP_CONFIG } from '../../app/app.config';
import moment from 'moment';

@IonicPage({ name: 'Atendimento', segment: 'atendimento' })
@Component({ selector: 'page-atendimento', templateUrl: 'atendimento.html', })
export class AtendimentoPage {

  private formData: FormGroup;
  formSubmit = false;
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
    private alertCtrl: AlertController,
    public events: Events,
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private completerService: CompleterService,
    public loadingCtrl: LoadingController,
    private requestService: RequestService,
    private formBuilder: FormBuilder) {

    this.initVariables();
    this.dataService = completerService.local(this.searchData, 'nome', 'nome');

    this.formData = this.formBuilder.group({
      nome: [''],
      dataInicio: ['', [Validators.minLength(10), this.dataValidator]],
      dataFim: ['', [Validators.minLength(10), this.dataValidator]]
    });
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
    this.formSubmit = true;
    if (this.formData.valid) {
      let loading = this.loadingCtrl.create();
      loading.present();
      this.listPage = 1;
      this.list = [];
      if (this.dataInicial != null && this.dataInicial != undefined && this.dataInicial != "") {
        this.filtro.dataInicial = moment(this.dataInicial, 'DD/MM/YYYY').format('YYYY-MM-DD');
      }else{
        delete this.filtro.dataInicial;
      }
      if (this.dataFinal != null && this.dataFinal != undefined && this.dataFinal != "") {
        this.filtro.dataFinal = moment(this.dataFinal, 'DD/MM/YYYY').format('YYYY-MM-DD');
      }else{
        delete this.filtro.dataFinal;
      }
      if (this.filtro.idResponsavel == "null") {
        delete this.filtro.idResponsavel;
      }
      if (this.filtro.idTipoAtendimento == "null") {
        delete this.filtro.idTipoAtendimento;
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
  }

  alertExcluirAtendimento(atendimento) {
    let alert = this.alertCtrl.create({
      title: 'Excluir atendimento',
      message: 'Você realmente deseja excluir esse atendimento?',
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
            this.excluirAtendimento(atendimento);
          }
        }
      ]
    });
    alert.present();
  }

  excluirAtendimento(atendimento) {
    atendimento.ativo = false;
    atendimento.usuario.pessoa.dataNascimento = moment(atendimento.usuario.pessoa.dataNascimento, 'DD/MM/YYYY').format('YYYY-MM-DD');
    atendimento.data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD');
    if (atendimento.paciente.pessoa.dataNascimento != null) {
      atendimento.paciente.pessoa.dataNascimento = moment(atendimento.paciente.pessoa.dataNascimento, 'DD/MM/YYYY').format('YYYY-MM-DD');
    }
    console.log(atendimento);
    let data = JSON.parse(JSON.stringify(atendimento));
    this.requestService.putData(APP_CONFIG.WEBSERVICE.ALTERAR_ATENDIMENTO, data).then((response: any) => {
      console.log(response);
      this.filtrarAtendimento();
    }, erro => {
      console.error(erro);
      this.presentToast(erro.errorMessage);
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
        this.searchData.push(new PessoaModel(p.pessoa.id, p.pessoa.nome, p.pessoa.cpf, p.pessoa.telefonePrimario, p.pessoa.telefoneSecundario));
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
    this.filtrarAtendimento();
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
    const modal = this.modalCtrl.create("ModalCadastroAtendimento", { enableBackdropDismiss: true });
    modal.onDidDismiss(data => {
      if (data) {
        this.presentToast("Atendimento cadastrado com sucesso!");
        this.filtrarAtendimento();
      }
    });
    modal.present();
  }

  abrirModalEdicaoAtendimento(atendimento) {
    const modal = this.modalCtrl.create("ModalCadastroAtendimento", {atendimento: atendimento}, { enableBackdropDismiss: true });
    modal.onDidDismiss(data => {
      if (data) {
        this.presentToast("Atendimento alterado com sucesso!");
        this.filtrarAtendimento();
      }
    });
    modal.present();
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
