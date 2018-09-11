import { IonicPage, Content, ToastController, ViewController, LoadingController } from "ionic-angular";
import { Component, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { RequestService } from "../../../../service/request.service";
import { MaskType } from '../../../../directives/mask-directive';
import moment from 'moment';
import { APP_CONFIG } from "../../../../app/app.config";
import { CompleterService } from "ng2-completer";

@IonicPage({
    name: 'ModalCadastroUsuario'
})
@Component({
    selector: 'page-modal-cadastro-usuario',
    templateUrl: 'modal-cadastro-usuario.html'
})
export class ModalCadastroUsuarioPage {
    @ViewChild(Content) content: Content;

    MaskType = MaskType;

    formSubmit = false;
    private form: FormGroup;
    lotacoes: any = [];
    usuario: any = {};
    ufs: any = [
        { sigla: "PR", id: 1 },
        { sigla: "AC", id: 2 },
        { sigla: "AL", id: 3 },
        { sigla: "AP", id: 4 },
        { sigla: "AM", id: 5 },
        { sigla: "BA", id: 6 },
        { sigla: "CE", id: 7 },
        { sigla: "DF", id: 8 },
        { sigla: "ES", id: 9 },
        { sigla: "GO", id: 10 },
        { sigla: "MA", id: 11 },
        { sigla: "MT", id: 12 },
        { sigla: "MS", id: 13 },
        { sigla: "MG", id: 14 },
        { sigla: "PA", id: 15 },
        { sigla: "PB", id: 16 },
        { sigla: "PE", id: 17 },
        { sigla: "PI", id: 18 },
        { sigla: "RJ", id: 19 },
        { sigla: "RN", id: 20 },
        { sigla: "RS", id: 21 },
        { sigla: "RO", id: 22 },
        { sigla: "RR", id: 23 },
        { sigla: "SC", id: 24 },
        { sigla: "SP", id: 25 },
        { sigla: "SE", id: 26 },
        { sigla: "TO", id: 27 }
    ];

    constructor(public toastCtrl: ToastController,
        private viewCtrl: ViewController,
        private formBuilder: FormBuilder,
        public loadingCtrl: LoadingController,
        private requestService: RequestService) {

        this.usuario.pessoa = {};
        this.listarLotacoes();
    }

    dismiss(data?) {
        data ? this.viewCtrl.dismiss(data) : this.viewCtrl.dismiss();
    }

    listarLotacoes() {
        this.requestService.getData(APP_CONFIG.WEBSERVICE.LISTAR_LOTACOES).then((lotacoes: any) => {
            this.lotacoes = lotacoes;
            console.log(this.lotacoes);
        }, error => {
            console.error(error);
        });
    }

    salvarUsuario() {
        let loading = this.loadingCtrl.create();
        loading.present();
        this.usuario.pessoa.cpf = this.unmask(this.usuario.pessoa.cpf);
        this.usuario.pessoa.telefonePrimario = this.unmask(this.usuario.pessoa.telefonePrimario);
        this.usuario.pessoa.telefoneSecundario = this.unmask(this.usuario.pessoa.telefoneSecundario);
        let dataNasc = moment(this.usuario.pessoa.dataNascimento, 'DD-MM-YYYY').format('YYYY-MM-DD');
        this.usuario.pessoa.dataNascimento = dataNasc;
        this.usuario.ativo = true;
        console.log(this.usuario);
        let data = JSON.parse(JSON.stringify(this.usuario));
        this.requestService.postData(APP_CONFIG.WEBSERVICE.CADASTRAR_USUARIOS, data).then((response: any) => {
            console.log(response);
            loading.dismiss();
            this.dismiss(true);
        }, erro => {
            console.error(erro);
            loading.dismiss();
            this.presentToast(erro.errorMessage);
        });
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