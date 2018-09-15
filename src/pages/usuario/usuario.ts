import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ModalController, ToastController, LoadingController } from 'ionic-angular';
import { CompleterData, CompleterItem, CompleterService } from 'ng2-completer';
import { PessoaModel } from '../../model/pessoa.model';
import { RequestService } from '../../service/request.service';
import { APP_CONFIG } from '../../app/app.config';

@IonicPage({
  name: 'Usuario',
  segment: 'usuario'
})
@Component({
  selector: 'page-usuario',
  templateUrl: 'usuario.html',
})
export class UsuarioPage {

  items = [];
  filtro: any = {};
  usuarios: any = [];

  dataService: CompleterData;
  searchData: Array<PessoaModel> = [];
  p: string;

  listUsuarios: any = [];
  listPage: number = 1;
  listSize: number = 10;
  list: any = [];

  constructor(public events: Events, 
    public navCtrl: NavController, 
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private completerService: CompleterService,
    public loadingCtrl: LoadingController,
    private requestService: RequestService,
    public modalCtrl: ModalController) {

      this.dataService = completerService.local(this.searchData, 'nome', 'nome');
      this.initVariables();
    
    for (let i = 0; i < 15; i++) {
      this.items.push( this.items.length );
    }
  }

  selecionado(selected: CompleterItem) {
    if (selected) {
      this.filtro.idUsuario = selected.originalObject.id;
    }
  }

  initVariables() {
    let loading = this.loadingCtrl.create();
    loading.present();
    this.listarUsuarios();
    loading.dismiss();
  }

  listarUsuarios() {
    this.requestService.getData(APP_CONFIG.WEBSERVICE.LISTAR_USUARIOS).then((usuarios: any) => {
      this.usuarios = usuarios;
      usuarios.forEach(p => {
        this.searchData.push(new PessoaModel(p.pessoa.id, p.pessoa.nome, p.pessoa.cpf, p.pessoa.telefonePrimario, p.pessoa.telefoneSecundario));
      });
      console.log(this.usuarios);
    }, error => {
      console.error(error);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsuarioPage');
    this.filtrarUsuario();
  }
 
  doInfinite(infiniteScroll) {
    this.listPage = this.listPage + 1;
    setTimeout(() => {
      let tam = (this.listPage * this.listSize);
      tam > this.listarUsuarios.length ? tam = this.listarUsuarios.length : tam = tam
      for (let i = ((this.listPage * this.listSize) - this.listSize); i < tam; i++) {
        this.list.push(this.listarUsuarios[i]);
      }
      infiniteScroll.complete();
    }, 500);
  }

  filtrarUsuario() {
    let loading = this.loadingCtrl.create();
    loading.present();
    this.listPage = 1;
    this.list = [];
    if(this.filtro.cpf != null || this.filtro.cpf != undefined){
      this.filtro.cpf = this.unmask(this.filtro.cpf);
    }
    if(this.filtro.ativo == "null"){
      delete this.filtro.ativo;
    }
    if(this.filtro.medico == "null"){
      delete this.filtro.medico;
    }
    if(this.filtro.administrador == "null"){
      delete this.filtro.administrador;
    }
    console.log(this.filtro);
    let urlRequest = this.requestService.buildHttpBodyFormData(this.filtro, APP_CONFIG.WEBSERVICE.FILTRAR_USUARIO);
    this.requestService.getData(urlRequest).then((usuarios: any) => {
      this.listarUsuarios = usuarios;
      let tam = this.listSize;
      this.listSize > this.listarUsuarios.length ? tam = this.listarUsuarios.length : tam = this.listSize;
      for (let i = 0; i < tam; i++) {
        this.list.push(this.listarUsuarios[i]);
      }
      console.log(this.listarUsuarios);
      loading.dismiss();
    }, error => {
      console.error(error);
      loading.dismiss();
      this.presentToast(error.errorMessage);
    });
  }

  abrirModalCadastroUsuario() {
    console.log();
    const modal = this.modalCtrl.create("ModalCadastroUsuario", { enableBackdropDismiss: false });
    modal.onDidDismiss(data => {
      if (data) {
        this.presentToast("Usuário cadastrado com sucesso!");
      }
    });
    modal.present();
  }

  editarUsuario(usuario){
    console.log();
    const modal = this.modalCtrl.create("ModalCadastroUsuario", {usuario: usuario}, { enableBackdropDismiss: false });
    modal.onDidDismiss(data => {
      if (data) {
        this.presentToast("Usuário editado com sucesso!");
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
