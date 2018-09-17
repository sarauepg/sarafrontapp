import { IonicPage, Content, ToastController, ViewController, LoadingController, NavParams, AlertController } from "ionic-angular";
import { Component, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { RequestService } from "../../../../service/request.service";
import { MaskType } from '../../../../directives/mask-directive';
import moment from 'moment';
import { APP_CONFIG } from "../../../../app/app.config";
import * as cpfCnpj from 'cpf_cnpj';

@IonicPage({name: 'ModalCadastroUsuario'})
@Component({selector: 'page-modal-cadastro-usuario', templateUrl: 'modal-cadastro-usuario.html'})
export class ModalCadastroUsuarioPage {
    @ViewChild(Content) content: Content;

    MaskType = MaskType;

    isEditing = false;
    formSubmit = false;
    private form: FormGroup;
    dataNascimento: string;
    telefonePrimario: string;
    telefoneSecundario: string;
    lotacoes: any = [];
    usuario: any = {};
    atLeastOneLetterOneDigitRegExp: RegExp = /[^\w\d]*(([0-9]+.*[A-Za-z]+.*)|[A-Za-z]+.*([0-9]+.*))/;
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

    constructor(public params: NavParams,
        private alertCtrl: AlertController,
        public toastCtrl: ToastController,
        private viewCtrl: ViewController,
        private formBuilder: FormBuilder,
        public loadingCtrl: LoadingController,
        private requestService: RequestService) {

        this.usuario.pessoa = {};
        this.usuario.medico = false;
        this.usuario.administrador = false;
        this.listarLotacoes();
        this.editarUsuario();

        this.form = this.formBuilder.group({
            nome: ['', Validators.required],
            cpf: ['', [Validators.required, this.cpfValidator]],
            dataNasc: ['', [Validators.required, Validators.minLength(10), this.dataValidator]],
            uf: [{ value: '', disabled: this.isEditing }, Validators.required],
            ufIsEditing: [{ value: '', disabled: !this.isEditing }, Validators.required],
            numeroConselho: ['', Validators.required],
            medico: [false, Validators.required],
            lotacao: [{ value: '', disabled: this.isEditing }, Validators.required],
            lotacaoIsEditing: [{ value: '', disabled: !this.isEditing }, Validators.required],
            telefonePrimario: ['', [Validators.required, Validators.minLength(14)]],
            telefoneSecundario: ['', Validators.minLength(14)],
            email: ['', Validators.email],
            nomeUsuario: ['', [Validators.required, Validators.minLength(4)]],
            administrador: [false, Validators.required],
            ativo: [{ value: false, disabled: !this.isEditing }, Validators.required],
            senhaGroup: this.formBuilder.group({
                senha: [{ value: '', disabled: this.isEditing }, [Validators.required, Validators.minLength(6), Validators.pattern(this.atLeastOneLetterOneDigitRegExp)]],
                repetirSenha: [{ value: '', disabled: this.isEditing }, [Validators.required, Validators.minLength(6), Validators.pattern(this.atLeastOneLetterOneDigitRegExp)]]
            }, { validator: this.samePasswordValidator }),

        });
    }

    editarUsuario() {
        let usuario: any = this.params.get('usuario');
        if (usuario != null) {
            this.isEditing = true;
            this.usuario.pessoa.id = usuario.pessoa.id;
            this.usuario.pessoa.nome = usuario.pessoa.nome;
            this.usuario.pessoa.cpf = usuario.pessoa.cpf;
            this.usuario.pessoa.dataNascimento = usuario.pessoa.dataNascimento;
            this.usuario.uf = usuario.uf;
            this.usuario.numeroConselho = usuario.numeroConselho;
            this.usuario.medico = usuario.medico;
            this.usuario.pessoa.lotacao = usuario.pessoa.lotacao;
            this.telefonePrimario = usuario.pessoa.telefonePrimario;
            this.telefoneSecundario = usuario.pessoa.telefoneSecundario;
            this.usuario.pessoa.email = usuario.pessoa.email;
            this.usuario.nomeUsuario = usuario.nomeUsuario;
            this.usuario.administrador = usuario.administrador;
            this.usuario.ativo = usuario.ativo;
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

    salvarUsuario() {
        this.formSubmit = true;
        if (this.form.valid) {
            let loading = this.loadingCtrl.create();
            loading.present();
            this.usuario.pessoa.cpf = this.unmask(this.usuario.pessoa.cpf);
            this.usuario.pessoa.telefonePrimario = this.unmask(this.telefonePrimario);
            this.usuario.pessoa.telefoneSecundario = this.unmask(this.telefoneSecundario);
            this.usuario.pessoa.dataNascimento = moment(this.dataNascimento, 'DD-MM-YYYY').format('YYYY-MM-DD');
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
        }else{
            this.presentToast("Por favor, cheque os campos em destaque.");
        }
    }

    /*alterarUsuario() {
        this.formSubmit = true;
        if (this.form.valid) {
            let loading = this.loadingCtrl.create();
            loading.present();
            this.usuario.pessoa.cpf = this.unmask(this.usuario.pessoa.cpf);
            this.usuario.pessoa.telefonePrimario = this.unmask(this.telefonePrimario);
            this.usuario.pessoa.telefoneSecundario = this.unmask(this.telefoneSecundario);
            let dataNasc = moment(this.usuario.pessoa.dataNascimento, 'DD-MM-YYYY').format('YYYY-MM-DD');
            this.usuario.pessoa.dataNascimento = dataNasc;
            console.log(this.usuario);
            let data = JSON.parse(JSON.stringify(this.usuario));
            this.requestService.putData(APP_CONFIG.WEBSERVICE.ALTERAR_USUARIO, data).then((response: any) => {
                console.log(response);
            }, erro => {
                console.error(erro);
                this.presentToast(erro.errorMessage);
            });
        }
    }*/

    alterarUsuario() {
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

    private samePasswordValidator(formGroup: FormGroup) {
        let confirm = formGroup.controls.senha.value === formGroup.controls.repetirSenha.value ? null : { mismatch: true };
        return confirm;
    }

    presentToast(msg) {
        const toast = this.toastCtrl.create({
            message: msg,
            duration: 5000
        });
        toast.present();
    }
}