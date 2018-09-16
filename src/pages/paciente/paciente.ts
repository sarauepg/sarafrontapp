import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ModalController, ToastController, LoadingController } from 'ionic-angular';
import { CompleterService, CompleterData, CompleterItem } from 'ng2-completer';
import { PessoaModel } from '../../model/pessoa.model';
import { RequestService } from '../../service/request.service';
import { APP_CONFIG } from '../../app/app.config';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage({
  name: 'Paciente',
  segment: 'paciente'
})
@Component({
  selector: 'page-paciente',
  templateUrl: 'paciente.html',
})
export class PacientePage {

  private form: FormGroup;

  items = [];
  filtro: any = {};
  pacientes: any = [];
  lotacoes: any = [];

  dataService: CompleterData;
  searchData: Array<PessoaModel> = [];
  p: string;

  listPacientes: any = [];
  listPage: number = 1;
  listSize: number = 10;
  list: any = [];

  constructor(public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public events: Events, public navCtrl: NavController,
    public navParams: NavParams,
    private completerService: CompleterService,
    public modalCtrl: ModalController,
    private requestService: RequestService,
    private formBuilder: FormBuilder) {

    this.dataService = completerService.local(this.searchData, 'nome', 'nome');
    this.initVariables();  
  }

  selecionado(selected: CompleterItem) {
    if (selected) {
      this.filtro.idPaciente = selected.originalObject.id;
    }
  }

  initVariables() {
    let loading = this.loadingCtrl.create();
    loading.present();
    this.listarLotacoes();
    this.listarPacientes();
    loading.dismiss();
  }

  filtrarPaciente() {
    let loading = this.loadingCtrl.create();
    loading.present();
    this.listPage = 1;
    this.list = [];
    if (this.filtro.cpf != null || this.filtro.cpf != undefined) {
      this.filtro.cpf = this.unmask(this.filtro.cpf);
    }
    if(this.filtro.idLotacao == "null"){
      delete this.filtro.idLotacao;
    }
    let urlRequest = this.requestService.buildHttpBodyFormData(this.filtro, APP_CONFIG.WEBSERVICE.FILTRAR_PACIENTE);
    this.requestService.getData(urlRequest).then((pacientes: any) => {
      this.listPacientes = pacientes;
      let tam = this.listSize;
      this.listSize > this.listPacientes.length ? tam = this.listPacientes.length : tam = this.listSize;
      for (let i = 0; i < tam; i++) {
        this.list.push(this.listPacientes[i]);
      }
      console.log(this.listPacientes);
      loading.dismiss();
    }, error => {
      console.error(error);
      loading.dismiss();
      this.presentToast(error.errorMessage);
    });
  }

  listarLotacoes() {
    this.requestService.getData(APP_CONFIG.WEBSERVICE.LISTAR_LOTACOES).then((lotacoes: any) => {
      this.lotacoes = lotacoes;
      console.log(this.lotacoes);
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad PacientePage');
    this.filtrarPaciente();  
  }

  doInfinite(infiniteScroll) {
    this.listPage = this.listPage + 1;
    setTimeout(() => {
      let tam = (this.listPage * this.listSize);
      tam > this.listPacientes.length ? tam = this.listPacientes.length : tam = tam
      for (let i = ((this.listPage * this.listSize) - this.listSize); i < tam; i++) {
        this.list.push(this.listPacientes[i]);
      }
      infiniteScroll.complete();
    }, 500);
  }

  abrirModalCadastroPaciente() {
    console.log();
    const modal = this.modalCtrl.create("ModalCadastroPaciente", { enableBackdropDismiss: false });
    modal.onDidDismiss(data => {
      if (data) {
        this.presentToast("Paciente cadastrado com sucesso!");
        this.filtrarPaciente();
      }
    });
    modal.present();
  }

  editarPaciente(paciente){
    console.log();
    const modal = this.modalCtrl.create("ModalCadastroPaciente", {paciente: paciente}, { enableBackdropDismiss: false });
    modal.onDidDismiss(data => {
      if (data) {
        this.presentToast("Paciente editado com sucesso!");
      }
    });
    modal.present();
  }

  private unmask(value): string {
    if (!value) return "";
    // return value.replace(/\D+/g, '');
    // console.log(value);
    return value.replace(/[^a-z0-9]/gi, "");
  }

  presentToast(msg) {
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 5000
    });
    toast.present();
  }

}
