import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ModalController, LoadingController, ViewController, ToastController } from 'ionic-angular';
import { CompleterData, CompleterService } from 'ng2-completer';
import { PessoaModel } from '../../model/pessoa.model';
import { RequestService } from '../../service/request.service';
import { FormBuilder } from '@angular/forms';
import { APP_CONFIG } from '../../app/app.config';

@IonicPage({
  name: 'Atendimento',
  segment: 'atendimento'
})
@Component({
  selector: 'page-atendimento',
  templateUrl: 'atendimento.html',
})
export class AtendimentoPage {

  items = [];
  tiposAtendimento: any;
  responsaveis: any;
  pacientes: any = [];
  filtro: any = {};

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

    for (let i = 0; i < 15; i++) {
      this.items.push(this.items.length);
    }

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

  listarResponsaveis(){
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
    console.log('Begin async operation');

    setTimeout(() => {
      for (let i = 0; i < 15; i++) {
        this.items.push(this.items.length);
      }

      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }

  abrirModalCadastroAtendimento() {
    console.log();
    const modal = this.modalCtrl.create("ModalCadastroAtendimento", { enableBackdropDismiss: false });
		/*modal.onDidDismiss(data => {
			if(data != undefined){
				this.businessHours = data;
			}
		  });*/
    modal.present();
  }

}
