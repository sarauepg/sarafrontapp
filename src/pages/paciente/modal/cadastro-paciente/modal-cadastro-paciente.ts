import { IonicPage, Content, ToastController, ViewController, LoadingController } from "ionic-angular";
import { Component, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { RequestService } from "../../../../service/request.service";
import { MaskType } from '../../../../directives/mask-directive';
import moment from 'moment';
import { APP_CONFIG } from "../../../../app/app.config";
import { CompleterService } from "ng2-completer";

@IonicPage({
    name: 'ModalCadastroPaciente'
})
@Component({
    selector: 'page-modal-cadastro-paciente',
    templateUrl: 'modal-cadastro-paciente.html'
})
export class ModalCadastroPacientePage {
    @ViewChild(Content) content: Content;

    MaskType = MaskType;

    formSubmit = false;
    private form: FormGroup;
    lotacoes: any = [];
    paciente: any = {};

    constructor(public toastCtrl: ToastController,
        private viewCtrl: ViewController,
        private formBuilder: FormBuilder,
        public loadingCtrl: LoadingController,
        private requestService: RequestService) {

        this.paciente.pessoa = {};
        this.paciente.pessoa.email = "";
        this.paciente.observacaoMedica = "";
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

    salvarPaciente() {
        let loading = this.loadingCtrl.create();
        loading.present();
        this.paciente.pessoa.cpf = this.unmask(this.paciente.pessoa.cpf);
        this.paciente.pessoa.telefonePrimario = this.unmask(this.paciente.pessoa.telefonePrimario);
        this.paciente.pessoa.telefoneSecundario = this.unmask(this.paciente.pessoa.telefoneSecundario);
        let dataNasc = moment(this.paciente.pessoa.dataNascimento, 'DD-MM-YYYY').format('YYYY-MM-DD');
        this.paciente.pessoa.dataNascimento = dataNasc;
        console.log(this.paciente);
        let data = JSON.parse(JSON.stringify(this.paciente));
        this.requestService.postData(APP_CONFIG.WEBSERVICE.CADASTRAR_PACIENTES, data).then((response: any) => {
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