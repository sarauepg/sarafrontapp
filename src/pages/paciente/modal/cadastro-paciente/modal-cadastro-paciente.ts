import { IonicPage, Content, ToastController, ViewController, LoadingController, NavParams, AlertController } from "ionic-angular";
import { Component, ViewChild, ChangeDetectorRef } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { RequestService } from "../../../../service/request.service";
import { MaskType } from '../../../../directives/mask-directive';
import moment from 'moment';
import * as cpfCnpj from 'cpf_cnpj';
import { APP_CONFIG } from "../../../../app/app.config";

@IonicPage({ name: 'ModalCadastroPaciente' })
@Component({ selector: 'page-modal-cadastro-paciente', templateUrl: 'modal-cadastro-paciente.html' })
export class ModalCadastroPacientePage {
    @ViewChild(Content) content: Content;

    MaskType = MaskType;

    isEditing = false;
    formSubmit = false;
    private form: FormGroup;
    lotacoes: any = [];
    paciente: any = {};
    telefonePrimario: string;
    telefoneSecundario: string;

    constructor(public params: NavParams,
        private alertCtrl: AlertController,
        public toastCtrl: ToastController,
        private viewCtrl: ViewController,
        private formBuilder: FormBuilder,
        public loadingCtrl: LoadingController,
        private requestService: RequestService,
        private cdRef: ChangeDetectorRef) {

        this.paciente.pessoa = {};
        this.paciente.pessoa.email = "";
        this.paciente.observacaoMedica = "";
        this.listarLotacoes();
        this.editarPaciente();

        this.form = this.formBuilder.group({
            nome: ['', Validators.required],
            cpf: ['', [Validators.required, this.cpfValidator]],
            dataNasc: ['', [Validators.required, Validators.minLength(10), this.dataValidator]],
            lotacao: [{ value: '', disabled: this.isEditing }, Validators.required],
            lotacaoIsEditing: [{ value: '', disabled: !this.isEditing }, Validators.required],
            telefonePrimario: ['', [Validators.required, Validators.minLength(14)]],
            telefoneSecundario: ['', Validators.minLength(14)],
            email: [''],
            obsMedicas: ['']
        });
    }

    editarPaciente() {
        let paciente: any = this.params.get('paciente');
        if (paciente != null) {
            this.isEditing = true;
            this.paciente.pessoa.nome = paciente.pessoa.nome;
            this.paciente.pessoa.cpf = paciente.pessoa.cpf;
            this.paciente.pessoa.dataNascimento = paciente.pessoa.dataNascimento;
            this.paciente.pessoa.lotacao = paciente.pessoa.lotacao;
            this.telefonePrimario = paciente.pessoa.telefonePrimario;
            this.telefoneSecundario = paciente.pessoa.telefoneSecundario;
            this.paciente.pessoa.email = paciente.pessoa.email;
            this.paciente.observacaoMedica = paciente.observacaoMedica;
        }
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
            this.paciente.pessoa.telefoneSecundario = this.unmask(this.telefoneSecundario);
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
        }else{
            this.presentToast("Por favor, cheque os campos em destaque.");
        }
    }

    alterarPaciente() {
        let alert = this.alertCtrl.create({
            title: 'Oops!',
            message: 'Parece que essa funcionalidade ainda não foi implementada. Aguarde futuras versões.',
            buttons: [
                {
                    text: 'Ok',
                    role: 'cancel',
                    handler: () => {
                        console.log('Ok clicked');
                    }
                }
            ]
        });
        alert.present();
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