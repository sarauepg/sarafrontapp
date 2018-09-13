import { IonicPage, Content, ToastController, ViewController, LoadingController } from "ionic-angular";
import { Component, ViewChild, ChangeDetectorRef } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { RequestService } from "../../../../service/request.service";
import { MaskType } from '../../../../directives/mask-directive';
import moment from 'moment';
import * as cpfCnpj from 'cpf_cnpj';
import { APP_CONFIG } from "../../../../app/app.config";

@IonicPage({name: 'ModalCadastroPaciente'})
@Component({selector: 'page-modal-cadastro-paciente', templateUrl: 'modal-cadastro-paciente.html'})
export class ModalCadastroPacientePage {
    @ViewChild(Content) content: Content;

    MaskType = MaskType;

    formSubmit = false;
    private form: FormGroup;
    lotacoes: any = [];
    paciente: any = {};
    telefonePrimario: string;

    constructor(public toastCtrl: ToastController,
        private viewCtrl: ViewController,
        private formBuilder: FormBuilder,
        public loadingCtrl: LoadingController,
        private requestService: RequestService,
        private cdRef: ChangeDetectorRef) {

        this.paciente.pessoa = {};
        this.paciente.pessoa.email = "";
        this.paciente.observacaoMedica = "";
        this.listarLotacoes();

        this.form = this.formBuilder.group({
            nome: ['', Validators.required],
            cpf: ['', [Validators.required, this.cpfValidator]],
            dataNasc: ['', [Validators.required, Validators.minLength(10), this.dataValidator]],
            lotacao: ['', Validators.required],
            telefonePrimario: ['', [Validators.required, Validators.minLength(14)]],
            telefoneSecundario: ['', Validators.minLength(14)],
            email: [''],
            obsMedicas: ['']
        });
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
        this.formSubmit = true;
        if (this.form.valid) {
            let loading = this.loadingCtrl.create();
            loading.present();
            this.paciente.pessoa.cpf = this.unmask(this.paciente.pessoa.cpf);
            this.paciente.pessoa.telefonePrimario = this.unmask(this.telefonePrimario);
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
    }

    private unmask(value): string {
        if (!value) return "";
        // return value.replace(/\D+/g, '');
        // console.log(value);
        return value.replace(/[^a-z0-9]/gi, "");
    }

    private cpfValidator(control: FormControl) {
        let cpf = cpfCnpj.CPF.isValid(control.value);
        let valid = cpf ? null : { cpf: true };
        return valid;
    }

    private dataValidator(control: FormControl) {
        let data = moment(control.value, 'DD-MM-YYYY').isValid();
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